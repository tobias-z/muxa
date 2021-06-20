import type { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { useRouterContext } from "./ssr-router";

export default function useRouteData<RouteData>(): [
  routeData: RouteData | undefined,
  setRouterData: Dispatch<SetStateAction<RouteData | undefined>>
] {
  let { routes } = useRouterContext();
  let { path } = useRouteMatch();
  const [routeData, setRouteData] = useState<RouteData>();

  useEffect(() => {
    let route = routes.paths.find(route => route.path === path);
    if (!route) return;
    setRouteData(route.routeData as RouteData | undefined);
  }, []);

  return [routeData, setRouteData];
}
