import type * as Muxa from "../types";
import { useRouterCache } from "./router";
import { useCallback, useMemo, useState } from "react";
import invariant from "./utils/invariant";
import { useRoutePath } from "./route-props";

export default function useRouteData<
  Data = any,
  Errors = any
>(): Muxa.RouteData<Data | undefined, Errors>;

export default function useRouteData<Data, Errors = any>(): Muxa.RouteData<
  Data | undefined,
  Errors
>;

export default function useRouteData<Data, Errors>(): Muxa.RouteData<
  Data | undefined,
  Errors
> {
  let cache = useRouterCache();
  let path = useRoutePath();
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

        try {
          cache.toggleRouteLoading(path);
          let routeData = await route.loader({
            params: route.params,
            addError,
          });
          cache.updateRoute(route.path, { errors, routeData });
        } catch (err) {
          // Do something with the error?
          console.error(err.message);
        } finally {
          cache.toggleRouteLoading(path);
          toggleRerender(!rerender);
        }
      };
    },
    [window.location.pathname, path]
  );

  let route = cache.get(path);
  let runLoader = useMemo(() => getLoader(route), [getLoader]);

  invariant(route, `Route with path: ${path}, was not defined`);

  return {
    data: route.routeData as Data | undefined,
    runLoader,
    errors: route.errors as Errors,
    isLoading: route.isLoading,
  };
}
