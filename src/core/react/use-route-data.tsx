import type * as Muxa from "../../types";
import { useRouterCache } from "./router";
import { useCallback, useMemo, useState } from "react";
import invariant from "../invariant";
import { useRoutePath } from "./route-props";
import { useHistory } from "react-router-dom";

export default function useRouteData<
  Data = any,
  Errors = any
>(): Muxa.RouteData<Data, Errors>;

export default function useRouteData<Data, Errors = any>(): Muxa.RouteData<
  Data,
  Errors
>;

export default function useRouteData<Data, Errors>(): Muxa.RouteData<
  Data,
  Errors
> {
  let cache = useRouterCache();
  let path = useRoutePath();
  let { push } = useHistory();
  let [route, setRoute] = useState(() => cache.get(path));

  let redirect: Muxa.RedirectFunction = (path: string) => {
    return () => {
      return push(path);
    };
  };

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
            globalData: cache.globalData,
            redirect,
          });
          cache.updateRoute(route.path, { errors, routeData });
          setRoute({
            ...route,
            errors,
            routeData,
          });
        } catch (err) {
          // Do something with the error?
          console.error(err.message);
        } finally {
          cache.toggleRouteLoading(path);
        }
      };
    },
    [window.location.pathname, path]
  );

  let runLoader = useMemo(() => getLoader(route), [getLoader]);

  invariant(route, "No route was found for path: " + path);

  return {
    data: route.routeData as Data,
    runLoader,
    errors: route.errors as Errors,
    isLoading: route.isLoading,
  };
}
