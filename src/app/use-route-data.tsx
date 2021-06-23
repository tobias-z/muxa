import { useEffect, useState } from "react";
import { Get } from "../types";
import { useRouterContext } from "./ssr-router";

type RouteData<Data> = {
  data: Data | undefined;
  get: Get;
};

export default function useRouteData<Data>(path?: string): RouteData<Data> {
  let { routes } = useRouterContext();
  let [routeData, setRouteData] = useState<RouteData<Data>>();

  useEffect(() => {
    let location = window.location.pathname;
    let route = routes.paths.find(route => {
      if (path) {
        return route.path === path;
      }
      return route.path === location;
    });
    if (!route) return;
    setRouteData({
      data: route.routeData as Data | undefined,
      get: route.get,
    });
  }, []);

  return {
    data: routeData?.data,
    get: routeData?.get as Get,
  };
}
