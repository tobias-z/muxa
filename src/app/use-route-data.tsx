import type * as Muxa from "../types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRouterContext } from "./router";

export default function useRouteData<Data = any, Errors = any>(
  path?: string
): Muxa.RouteData<Data | undefined, Errors>;

export default function useRouteData<Data, Errors = any>(
  path?: string
): Muxa.RouteData<Data | undefined, Errors>;

export default function useRouteData<Data, Errors>(
  path?: string
): Muxa.RouteData<Data, Errors> {
  let { routes, dispatch } = useRouterContext();
  let [routeData, setRouteData] = useState<Muxa.RouteData<Data, Errors>>();
  let params = useParams();

  function getLoader(route: Muxa.Route): () => Promise<unknown> {
    let errors: Muxa.RouteErrors = {};
    function addError(key: string, value: any) {
      errors[key] = value;
    }

    return async () => {
      try {
        let res = await route.loader({ params, addError });
        dispatch({
          type: "ADD_ROUTE_DATA",
          path: route.path,
          routeData: res,
          errors,
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
    errors: routeData?.errors as Errors,
  };
}
