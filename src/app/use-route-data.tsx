import type * as Muxa from "../types";
import { useRouterCache } from "./router";
import { useParams } from "react-router-dom";
import { useCallback, useMemo, useState } from "react";
import invariant from "./utils/invariant";

export default function useRouteData<Data = any, Errors = any>(
  path?: string
): Muxa.RouteData<Data | undefined, Errors>;

export default function useRouteData<Data, Errors = any>(
  path?: string
): Muxa.RouteData<Data | undefined, Errors>;

export default function useRouteData<Data, Errors>(
  path?: string
): Muxa.RouteData<Data | undefined, Errors> {
  let cache = useRouterCache();
  let params = useParams();
  let [rerender, toggleRerender] = useState<boolean>(true);

  let getLoader = useCallback(
    (route: Muxa.Route | undefined) => {
      let errors: Muxa.RouteErrors = {};
      function addError(key: string, value: any) {
        errors[key] = value;
      }

      invariant(route, "Could not generate loader");

      return async () => {
        invariant(
          route.loader,
          `You tried to call a loader in route: ${route.path}, but none was found`
        );

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
  let runLoader = useMemo(() => getLoader(route), [getLoader]);

  return {
    data: route?.routeData as Data | undefined,
    runLoader,
    errors: route?.errors as Errors,
    isLoading: route?.isLoading as boolean,
  };
}
