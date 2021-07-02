import type * as Muxa from "../types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRouterCache } from "./router";

export default function useRouteData<Data = any, Errors = any>(
  path?: string
): Muxa.RouteData<Data | undefined, Errors>;

export default function useRouteData<Data, Errors = any>(
  path?: string
): Muxa.RouteData<Data | undefined, Errors>;

export default function useRouteData<Data, Errors>(
  path?: string
): Muxa.RouteData<Data, Errors> {
  let cache = useRouterCache();
  let [routeData, setRouteData] = useState<Muxa.RouteData<Data, Errors>>();
  let params = useParams();

  function getLoader(route: Muxa.Route): () => Promise<unknown> {
    let errors: Muxa.RouteErrors = {};
    function addError(key: string, value: any) {
      errors[key] = value;
    }

    return async () => {
      try {
        let routeData = await route.loader({ params, addError });
        cache.updateRoute(route.path, { errors, routeData });
      } catch (err) {
        // Do something with the error?
        console.error(err.message);
      }
    };
  }

  function getRoute() {
    if (path) {
      return cache.getRoute(path);
    }
    return cache.getRoute(window.location.pathname);
  }

  useEffect(() => {
    let route = getRoute();
    if (!route) return;
    let loader = getLoader(route);
    setRouteData({
      data: route.routeData as Data | undefined,
      runLoader: loader,
      errors: route.errors as Errors,
      isLoading: route.isLoading,
    });
  }, []);

  return {
    data: routeData?.data,
    runLoader: routeData?.runLoader as () => Promise<unknown>,
    errors: routeData?.errors as Errors,
    isLoading: routeData?.isLoading as boolean,
  };
}
