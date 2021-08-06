import type * as Muxa from "../../types";
import { createElement, useReducer, useLayoutEffect } from "react";
import { useHistory, Route } from "react-router-dom";
import { useRouterCache } from "./router";
import {
  getParams,
  shouldRefetchLoader,
  getRealPathname,
  isOutdatedData,
  getExpirationDate,
} from "./utils";
import invariant from "../invariant";
import { RoutePropsProvider } from "./route-props";
import { Helmet } from "react-helmet";
import { getBaseLoader } from "./utils";

export default function LoadedRoute({
  component,
  ...props
}: Muxa.LoadedRouteProps) {
  let { path, loader, exact, action, routes, meta } = props;
  let cache = useRouterCache();
  let history = useHistory();
  let [update, forceUpdate] = useReducer(c => c + 1, 0);
  let thePath = getRealPathname(path);
  let route = cache.get(thePath);

  function initRoute(params: Muxa.Params) {
    let expires = getExpirationDate({ meta, params });

    cache.put(thePath, {
      loader,
      path: thePath,
      action,
      params,
      routes,
      expires,
    });

    // Will never reach the afterAll function
    // So we have to rerender after the path has been added
    if (!loader) {
      forceUpdate();
    }
  }

  useLayoutEffect(() => {
    let unsubscribe = cache.history.subscribe(thePath);

    let params = getParams(path);
    if (!route) {
      initRoute(params);
    }

    let tmpRoute = cache.get(thePath);
    invariant(
      tmpRoute,
      `Route ${thePath} was not yet initialized, when trying to run it's loader`
    );

    if (!loader) return;
    if (!shouldRefetchLoader({ exact, route: tmpRoute }, cache.history)) return;
    if (!isOutdatedData(tmpRoute)) return;

    let isCurrent = true;

    let runLoader = getBaseLoader(
      {
        cache,
        route: cache.get(thePath),
        history,
      },
      {
        afterAll() {
          if (isCurrent) {
            forceUpdate();
          }
        },
      }
    );
    runLoader();

    return () => {
      isCurrent = false;
      unsubscribe();
    };
  }, [history.location]);

  if (!route) return null;

  invariant(component, `No component was found for route ${thePath}`);

  let metaData = meta ? meta({ params: getParams(path) }) : null;

  return (
    <RoutePropsProvider routePath={path}>
      <Route {...props} key={update}>
        {metaData && (
          <Helmet>
            {metaData.title && <title>{metaData.title}</title>}
            {metaData.description && (
              <meta name="description" content={metaData.description} />
            )}
          </Helmet>
        )}
        {createElement(component)}
      </Route>
    </RoutePropsProvider>
  );
}
