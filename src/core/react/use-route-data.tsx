import type * as Muxa from "../../types";
import { useRouterCache } from "./router";
import { useLayoutEffect, useMemo, useRef } from "react";
import invariant from "../invariant";
import { useRoutePath } from "./route-props";
import { useHistory } from "react-router-dom";
import { getBaseLoader } from "./utils";

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
  const cache = useRouterCache();
  const path = useRoutePath();
  const history = useHistory();

  const runLoader = useMemo(
    () =>
      getBaseLoader(
        {
          cache,
          route: cache.get(path),
          history,
        },
        {
          onSuccess({ errors, response }) {
            route.current = {
              ...route.current,
              errors,
              data: response,
            };
          },
        }
      ),
    []
  );

  function getCurrentRoute() {
    const foundRoute = cache.get(path);
    invariant(foundRoute, "No route was found for path: " + path);
    return {
      data: foundRoute.routeData as Data,
      runLoader,
      errors: foundRoute.errors as Errors,
      isLoading: foundRoute.isLoading,
    };
  }

  const route = useRef<Muxa.RouteData<Data, Errors>>(getCurrentRoute());

  useLayoutEffect(() => {
    route.current = getCurrentRoute();
  }, [history.location]);

  return route.current;
}
