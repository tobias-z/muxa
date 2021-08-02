import type * as Muxa from "../../types";
import { createElement, useEffect, useReducer } from "react";
import { useHistory, Route } from "react-router-dom";
import { useRouterCache } from "./router";
import { getParams, shouldRefetchLoader, getRealPathname } from "./utils";
import invariant from "../invariant";
import { RoutePropsProvider } from "./route-props";
import { Helmet } from "react-helmet";
import getBaseLoader from "./utils/get-loader";

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

  useEffect(() => {
    cache.history.addActivePath(thePath);

    return () => {
      cache.history.removeActivePath(thePath);

      // Keep track of the previous path
      cache.history.previousPath = thePath;
    };
  }, [history.location]);

  function initRoute() {
    // Checks if route is added and adds a brand new one if it doesn't
    if (route) return;

    let params = getParams(path);

    let expires = meta && meta({ params }).expires;
    if (!expires) {
      let currentDate = new Date();
      // Defaults to one minute
      currentDate.setTime(currentDate.getTime() + 1000 * 60);
      expires = currentDate;
    }

    cache.put(thePath, {
      loader,
      path: thePath,
      action,
      params,
      routes,
      expires,
    });

    // Will never reach the end of the finally block
    // So we have to rerender after the path has been added
    if (!loader) {
      forceUpdate();
    }
  }

  useEffect(() => {
    initRoute();
    if (!loader) return;

    let params = getParams(path);
    if (!shouldRefetchLoader({ path, exact, params }, cache.history)) return;

    let isCurrent = true;

    let runLoader = getBaseLoader(
      {
        cache,
        redirect: path => () => history.push(path),
        route: cache.get(thePath),
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
