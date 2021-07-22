import type * as Muxa from "../../types";
import { useEffect, useState } from "react";
import { useHistory, Route } from "react-router-dom";
import { useRouterCache } from "./router";
import { getParams, shouldRefetchLoader, getRealPathname } from "./utils";
import { RoutePropsProvider } from "./route-props";

export default function LoadedRoute(props: Muxa.LoadedRouteProps) {
  let { path, loader, exact, action, routes } = props;
  let cache = useRouterCache();
  let history = useHistory();
  let params = getParams(path);
  let [update, forceUpdate] = useState<number>(0);
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

  useEffect(() => {
    // Checks if route is added and adds a brand new one if it doesn't
    if (route) return;

    cache.put(thePath, {
      loader,
      path: thePath,
      action,
      params,
      Component: props.component,
      routes,
    });

    // Will never reach the end of the finally block
    // So we have to rerender after the path has been added
    if (!loader) {
      forceUpdate(c => c + 1);
    }
  }, [history.location]);

  useEffect(() => {
    if (!loader) return;
    if (!shouldRefetchLoader({ path, exact, params }, cache.history)) return;

    let isCurrent = true;

    // Generates errors to be put on the route
    let errors: Muxa.RouteErrors = {};
    function addError(key: string, value: any) {
      errors[key] = value;
    }

    cache.toggleRouteLoading(thePath);
    loader({ params, addError })
      .then(response => {
        cache.updateRoute(thePath, { errors, routeData: response });
      })
      .catch(err => {
        console.error(err.message);
      })
      .finally(() => {
        cache.toggleRouteLoading(thePath);
        if (isCurrent) {
          forceUpdate(c => c + 1);
        }
      });

    return () => {
      isCurrent = false;
    };
  }, [history.location]);

  if (!route) return null;

  return (
    <RoutePropsProvider routePath={path}>
      <Route {...props} key={update} />
    </RoutePropsProvider>
  );
}
