import type * as Muxa from "../types";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Route } from "react-router-dom";
import { useRouterContext } from "./ssr-router";

export default function SSRRoute(props: Muxa.SSRRouteProps) {
  let { path, get } = props;
  let { routes, dispatch } = useRouterContext();
  let { location } = useHistory();

  useEffect(() => {
    let isAlreadyInPaths = routes.paths.find(
      currentPath => path === currentPath.path
    );
    if (isAlreadyInPaths) return;
    dispatch({ type: "ADD_ROUTE", path });
  }, []);

  useEffect(() => {
    if (!isGoingToRenderRoute()) return;
    console.log("rendering: " + path);
    if (get) {
      let returnVal = get();
      console.log(returnVal);
    }
  }, [location]);

  function isGoingToRenderRoute(): boolean {
    let willRender = false;
    if (location.pathname.includes(path as string)) {
      willRender = true;
    }
    return willRender;
  }

  return <Route {...props} />;
}
