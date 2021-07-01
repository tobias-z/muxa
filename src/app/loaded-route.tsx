import type * as Muxa from "../types";
import { useEffect, useState } from "react";
import { useHistory, Route } from "react-router-dom";
import { useRouterContext } from "./router";
import { getParams, isGoingToRenderRoute, getRealPathname } from "./utils";

export default function LoadedRoute(props: Muxa.LoadedRouteProps) {
  let { path, loader, exact } = props;
  let { routes, dispatch, fallback } = useRouterContext();
  let history = useHistory();
  let params = getParams(path);
  let [route, setRoute] = useState<Muxa.Route | null>(null);

  useEffect(() => {
    let tmpRoute = routes.paths.find(p => p.path === getRealPathname(path));
    if (!tmpRoute) return;
    setRoute(tmpRoute);
  }, [routes]);

  useEffect(() => {
    let realPathname = getRealPathname(path);
    let isAlreadyInPaths = routes.paths.find(currentPath => {
      return realPathname === currentPath.path;
    });
    if (isAlreadyInPaths) return;
    dispatch({ type: "ADD_ROUTE", path: realPathname, loader });
  }, [history.location]);

  useEffect(() => {
    if (!isGoingToRenderRoute(path, exact, params)) return;
    let isCurrent = true;

    // Generates errors to be put in the dispatch
    let errors: Muxa.RouteErrors = {};
    function addError(key: string, value: any) {
      errors[key] = value;
    }

    if (isCurrent) {
      let realPath = getRealPathname(path);
      dispatch({ type: "TOGGLE_LOADING", path: realPath });
      loader({ params, addError })
        .then(res => {
          if (isCurrent) {
            dispatch({
              type: "ADD_ROUTE_DATA",
              path: realPath,
              routeData: res,
              errors,
            });
          }
        })
        .catch(err => {
          console.error(err.message);
        })
        .finally(() => {
          dispatch({ type: "TOGGLE_LOADING", path: realPath });
        });
    }
    return () => {
      isCurrent = false;
    };
  }, [history.location]);

  if (!route) return null;
  if (route.isLoading && !route.routeData) return <>{fallback}</>;

  return <Route {...props} />;
}
