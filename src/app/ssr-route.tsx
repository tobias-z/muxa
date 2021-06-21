import type * as Muxa from "../types";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Route } from "react-router-dom";
import { useRouterContext } from "./ssr-router";

function getRealPathname(path: Muxa.Path) {
  if (!path) return path;
  if (path.includes(":")) {
    return window.location.pathname;
  } else {
    return path;
  }
}

export default function SSRRoute(props: Muxa.SSRRouteProps) {
  let { path, get } = props;
  let { routes, dispatch, fallback } = useRouterContext();
  let { location } = useHistory();
  let [isLoadingRoute, setIsLoadingRoute] = useState(false);
  let params = useParams();

  useEffect(() => {
    let realPathname = getRealPathname(path);
    let isAlreadyInPaths = routes.paths.find(
      currentPath => realPathname === currentPath.path
    );
    if (isAlreadyInPaths) return;
    dispatch({ type: "ADD_ROUTE", path: realPathname });
  }, []);

  useEffect(() => {
    if (!isGoingToRenderRoute()) return;
    if (get) {
      setIsLoadingRoute(true);
      get(params)
        .then(data => {
          let realPath = getRealPathname(path);
          dispatch({ type: "ADD_ROUTE_DATA", path: realPath, routeData: data });
        })
        .catch(err => {
          console.error(err.message);
        })
        .finally(() => setIsLoadingRoute(false));
    }
  }, [location]);

  function isGoingToRenderRoute(): boolean {
    let willRender = false;
    let realPath = getRealPathname(path) as string;
    if (location.pathname.includes(realPath)) {
      willRender = true;
    }
    return willRender;
  }

  if (isLoadingRoute) return <>{fallback}</>;

  return <Route {...props} />;
}
