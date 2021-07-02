import type * as Muxa from "../types";
import { useEffect, useState } from "react";
import { useHistory, Route } from "react-router-dom";
import { useRouterCache } from "./router";
import {
  getParams,
  isGoingToRenderRoute,
  getRealPathname,
} from "./utils/utils";

export default function LoadedRoute(props: Muxa.LoadedRouteProps) {
  let { path, loader, exact } = props;
  let cache = useRouterCache();
  let history = useHistory();
  let params = getParams(path);
  let [rerender, toggleRerender] = useState<boolean>(true);
  let route = cache.get(getRealPathname(path));

  useEffect(() => {
    // Checks if route is added and adds a brand new one if it doesn't
    let realPathname = getRealPathname(path);
    let foundRoute = cache.get(getRealPathname(path));
    if (foundRoute) return;
    cache.put(realPathname, { loader, path: realPathname });
  }, [history.location]);

  useEffect(() => {
    if (!isGoingToRenderRoute(path, exact, params)) return;

    // Generates errors to be put on the route
    let errors: Muxa.RouteErrors = {};
    function addError(key: string, value: any) {
      errors[key] = value;
    }

    let realPath = getRealPathname(path);
    cache.toggleRouteLoading(realPath);
    loader({ params, addError })
      .then(response => {
        cache.updateRoute(realPath, { errors, routeData: response });
      })
      .catch(err => {
        console.error(err.message);
      })
      .finally(() => {
        cache.toggleRouteLoading(realPath);
        toggleRerender(!rerender);
      });
  }, [history.location]);

  if (!route) return null;

  return <Route {...props} />;
}
