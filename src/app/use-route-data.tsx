import type * as Muxa from "../types";
import { useRouterCache } from "./router";
import { useParams } from "react-router-dom";
import { useCallback, useState } from "react";

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
  let params = useParams();
  let [rerender, toggleRerender] = useState<boolean>(true);

  let getLoader = useCallback(
    (route: Muxa.Route | undefined) => {
      if (!route) {
        throw new Error("Could not generate loader");
      }

      let errors: Muxa.RouteErrors = {};
      function addError(key: string, value: any) {
        errors[key] = value;
      }

      return async () => {
        let realPath = path ? path : window.location.pathname;
        try {
          cache.toggleRouteLoading(realPath);
          let routeData = await route.loader({ params, addError });
          cache.updateRoute(route.path, { errors, routeData });
        } catch (err) {
          // Do something with the error?
          console.error(err.message);
        } finally {
          cache.toggleRouteLoading(realPath);
          toggleRerender(!rerender);
        }
      };
    },
    [window.location.pathname, path]
  );

  function getRoute() {
    if (path) {
      return cache.get(path);
    }
    return cache.get(window.location.pathname);
  }

  let route = getRoute();

  return {
    data: route?.routeData as Data | undefined,
    runLoader: getLoader(route),
    errors: route?.errors as Errors,
    isLoading: route?.isLoading as boolean,
  };
}
