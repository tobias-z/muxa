import type { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";
import { useRouterContext } from "./ssr-router";

export default function useRouteData<RouteData>(): [
  routeData: RouteData | undefined,
  setRouterData: Dispatch<SetStateAction<RouteData | undefined>>
] {
  let { routes } = useRouterContext();
  const [routeData, setRouteData] = useState<RouteData>();

  useEffect(() => {
    let route = routes.paths.find(
      route => route.path === window.location.pathname
    );
    if (!route) return;
    setRouteData(route.routeData as RouteData | undefined);
  }, []);

  return [routeData, setRouteData];
}
