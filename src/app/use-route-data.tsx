import type * as Muxa from "../types";
import type { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";
import { useRouterContext } from "./ssr-router";

export default function useRouteData<RouteData>(
  path?: string
): [
  routeData: RouteData | undefined,
  setRouterData: Dispatch<SetStateAction<RouteData | undefined>>
] {
  let { routes, dispatch } = useRouterContext();
  let [routeData, setRouteData] = useState<RouteData>();
  let [routePath, setRoutePath] = useState<Muxa.Path>();

  useEffect(() => {
    let location = window.location.pathname;
    let route = routes.paths.find(route => {
      if (path) {
        return route.path === path;
      }
      return route.path === location;
    });
    if (!route) return;
    setRouteData(route.routeData as RouteData | undefined);
    setRoutePath(route.path);
  }, []);

  let updateRouteData: Dispatch<SetStateAction<RouteData | undefined>> =
    value => {
      setRouteData(value);
      dispatch({
        type: "UPDATE_ROUTE_DATA",
        path: routePath,
        routeData: value,
      });
    };

  return [routeData, updateRouteData];
}
