import { useEffect } from "react";
import { Route, RouteProps } from "react-router-dom";
import { useRouterContext } from "./ssr-router";

export default function SSRRoute(props: RouteProps) {
  let { path } = props;
  let { routes, dispatch } = useRouterContext();

  useEffect(() => {
    if (routes.paths.includes(path)) return;
    dispatch({ type: "ADD_ROUTE", path });
  }, []);

  return <Route {...props} />;
}
