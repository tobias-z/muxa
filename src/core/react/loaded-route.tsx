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
import { useFilterHandler } from "./filter-handler-provider";

export default function LoadedRoute({
  component,
  ...props
}: Muxa.LoadedRouteProps) {
  const { path, loader, exact, action, routes, meta } = props;
  const cache = useRouterCache();
  const history = useHistory();
  const [update, forceUpdate] = useReducer(c => c + 1, 0);
  const thePath = getRealPathname(path);
  const route = cache.get(thePath);
  const filterHandler = useFilterHandler();

  function initRoute(params: Muxa.Params) {
    const expires = getExpirationDate({ meta, params });

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
    const unsubscribe = cache.history.subscribe(thePath);

    const params = getParams(path);
    if (!route) {
      initRoute(params);
    }

    const tmpRoute = cache.get(thePath);
    invariant(
      tmpRoute,
      `Route ${thePath} was not yet initialized, when trying to run it's loader`
    );

    if (!loader) return;
    if (!shouldRefetchLoader({ exact, route: tmpRoute }, cache.history)) return;
    if (!isOutdatedData(tmpRoute)) return;

    let isCurrent = true;

    const runLoader = getBaseLoader(
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

  const metaData = meta ? meta({ params: getParams(path) }) : null;

  // If filters all return true we can render the screen
  return filterHandler.callFilters(thePath as string) ? (
    <RoutePropsProvider routePath={path} key={update}>
      <Route {...props}>
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
  ) : null;
}
