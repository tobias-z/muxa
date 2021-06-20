import type * as Muxa from "../types";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Route } from "react-router-dom";
import { useRouterContext } from "./ssr-router";

export default function SSRRoute(props: Muxa.SSRRouteProps) {
  let { path, get } = props;
  let { routes, dispatch, fallback } = useRouterContext();
  let { location } = useHistory();
  let [isLoadingRoute, setIsLoadingRoute] = useState(false);

  useEffect(() => {
    let isAlreadyInPaths = routes.paths.find(
      currentPath => path === currentPath.path
    );
    if (isAlreadyInPaths) return;
    dispatch({ type: "ADD_ROUTE", path });
  }, []);

  useEffect(() => {
    if (!isGoingToRenderRoute()) return;
    if (get) {
      setIsLoadingRoute(true);
      get()
        .then(data => {
          dispatch({ type: "ADD_ROUTE_DATA", path, routeData: data });
        })
        .catch(err => {
          console.error(err.message);
        })
        .finally(() => setIsLoadingRoute(false));
    }
  }, [location]);

  function isGoingToRenderRoute(): boolean {
    let willRender = false;
    if (location.pathname.includes(path as string)) {
      willRender = true;
    }
    return willRender;
  }

  if (isLoadingRoute) return <>{fallback}</>;

  return <Route {...props} />;
}
