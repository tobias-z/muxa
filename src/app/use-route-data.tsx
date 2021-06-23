import type * as Muxa from "../types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRouterContext } from "./ssr-router";

type RouteData<Data> = {
  data: Data | undefined;
  get: () => Promise<unknown>;
};

export default function useRouteData<Data>(path?: string): RouteData<Data> {
  let { routes, dispatch } = useRouterContext();
  let [routeData, setRouteData] = useState<RouteData<Data>>();
  let params = useParams();

  function getLoader(route: Muxa.RouteData): () => Promise<unknown> {
    return async () => {
      try {
        let data = await route.get(params);
        dispatch({
          type: "ADD_ROUTE_DATA",
          path: route.path,
          routeData: data,
        });
      } catch (err) {
        console.error(err.message);
      }
    };
  }

  useEffect(() => {
    let location = window.location.pathname;
    let route = routes.paths.find(route => {
      if (path) {
        return route.path === path;
      }
      return route.path === location;
    });
    if (!route) return;
    let get = getLoader(route);
    setRouteData({
      data: route.routeData as Data | undefined,
      get,
    });
  }, []);

  return {
    data: routeData?.data,
    get: routeData?.get as () => Promise<unknown>,
  };
}
