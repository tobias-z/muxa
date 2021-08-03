import type * as Muxa from "../../types";
import { useRouterCache } from "./router";
import { useMemo, useState } from "react";
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
  let cache = useRouterCache();
  let path = useRoutePath();
  let { push } = useHistory();
  let [route, setRoute] = useState(() => cache.get(path));

  let runLoader = useMemo(
    () =>
      getBaseLoader(
        {
          cache,
          redirect: path => () => {
            cache.sendRedirect(path);
            push(path);
          },
          route: cache.get(path),
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

  invariant(route, "No route was found for path: " + path);

  return {
    data: route.routeData as Data,
    runLoader,
    errors: route.errors as Errors,
    isLoading: route.isLoading,
  };
}
