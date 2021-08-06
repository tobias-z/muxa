import type * as Muxa from "../../types";
import { useRouterCache } from "./router";
import { useEffect, useMemo, useState } from "react";
import invariant from "../invariant";
import { useRoutePath } from "./route-props";
import { useHistory } from "react-router-dom";
import { getBaseLoader, isOutdatedData } from "./utils";

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
  let history = useHistory();
  let [route, setRoute] = useState(cache.get(path));

  let runLoader = useMemo(
    () =>
      getBaseLoader(
        {
          cache,
          route: cache.get(path),
          history,
        },
        {
          onSuccess({ errors, response, route }) {
            setRoute({
              ...route,
              errors,
              routeData: response,
            });
          },
        }
      ),
    []
  );

  useEffect(() => {
    invariant(route, "No route was found for path: " + path);
    if (!isOutdatedData(route)) {
      setRoute(cache.get(path));
    }
  }, [history.location]);

  invariant(route, "No route was found for path: " + path);

  return {
    data: route.routeData as Data,
    runLoader,
    errors: route.errors as Errors,
    isLoading: route.isLoading,
  };
}
