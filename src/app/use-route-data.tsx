import type { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";
import { useRouterContext } from "./ssr-router";

export default function useRouteData<RouteData>(
  path?: string
): [
  routeData: RouteData | undefined,
  setRouterData: Dispatch<SetStateAction<RouteData | undefined>>
] {
  let { routes } = useRouterContext();
  let [routeData, setRouteData] = useState<RouteData>();

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
  }, []);

  return [routeData, setRouteData];
}
