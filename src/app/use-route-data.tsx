import type * as Muxa from "../types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRouterContext } from "./router";

export default function useRouteData<Data = unknown, Errors = unknown>(
  path?: string
): Muxa.RouteData<Data, Errors>;

export default function useRouteData<Data, Errors = unknown>(
  path?: string
): Muxa.RouteData<Data, Errors>;

export default function useRouteData<Data, Errors>(
  path?: string
): Muxa.RouteData<Data, Errors> {
  let { routes, dispatch } = useRouterContext();
  let [routeData, setRouteData] = useState<Muxa.RouteData<Data, Errors>>();
  let params = useParams();

  function getLoader(route: Muxa.Route): () => Promise<unknown> {
    return async () => {
      try {
        let res = await route.loader({ params });
        dispatch({
          type: "ADD_ROUTE_DATA",
          path: route.path,
          routeData: res.data,
          errors: res.errors,
        });
      } catch (err) {
        // Do something with the error?
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
    let loader = getLoader(route);
    setRouteData({
      data: route.routeData as Data | undefined,
      runLoader: loader,
      errors: route.errors as Errors,
    });
  }, []);

  return {
    data: routeData?.data,
    runLoader: routeData?.runLoader as () => Promise<unknown>,
    errors: routeData?.errors,
  };
}
