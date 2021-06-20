import { useEffect } from "react";
import type { RouteProps } from "react-router-dom";
import { Route, useRouteMatch } from "react-router-dom";
import { useRouterContext } from "./ssr-router";

export default function SSRRoute(props: RouteProps) {
  let { path } = props;
  let { routes, dispatch } = useRouterContext();
  let { path: routerPath } = useRouteMatch();

  useEffect(() => {
    let isAlreadyInPaths = routes.paths.find(
      currentPath => path === currentPath
    );
    if (isAlreadyInPaths) return;
    dispatch({ type: "ADD_ROUTE", path });
  }, []);

  useEffect(() => {
    if (path === routerPath) {
      console.log("on path: " + path);
    }
  }, [routerPath]);

  return <Route {...props} />;
}
