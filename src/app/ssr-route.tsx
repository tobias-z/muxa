import type * as Muxa from "../types";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Route } from "react-router-dom";
import { useRouterContext } from "./ssr-router";

function getRealPathname(path: Muxa.Path) {
  if (!path) return path;
  if (path.includes(":")) {
    let tmpPath = path as string;
    let idx = tmpPath.indexOf(":");
    let toReturn = window.location.pathname;
    if (toReturn.length < idx) {
      toReturn = tmpPath;
    }
    return toReturn;
  } else {
    return path;
  }
}

export default function SSRRoute(props: Muxa.SSRRouteProps) {
  let { path, get } = props;
  let { routes, dispatch, fallback } = useRouterContext();
  let history = useHistory();
  let params = useParams();
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
    dispatch({ type: "ADD_ROUTE", path: realPathname, get });
  }, [history.location]);

  useEffect(() => {
    if (!isGoingToRenderRoute()) return;
    let isCurrent = true;
    if (isCurrent) {
      let realPath = getRealPathname(path);
      dispatch({ type: "TOGGLE_LOADING", path: realPath });
      get({ params })
        .then(res => {
          if (isCurrent) {
            dispatch({
              type: "ADD_ROUTE_DATA",
              path: realPath,
              routeData: res.data,
              errors: res.errors,
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

  function isGoingToRenderRoute(): boolean {
    let willRender = false;
    let realPath = getRealPathname(path) as string;
    if (location.pathname.includes(realPath)) {
      willRender = true;
    }
    return willRender;
  }

  if (!route) return null;
  if (route.isLoading && !route.routeData) return <>{fallback}</>;

  return <Route {...props} />;
}
