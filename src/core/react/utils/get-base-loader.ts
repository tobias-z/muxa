import type * as Muxa from "../../../types";
import RouterCache from "../../cache/router-cache";
import invariant from "../../invariant";
import type { History } from "history";

interface Props {
  route: Muxa.Route | undefined;
  cache: RouterCache;
  history: History;
}

export function getBaseLoader(
  { route, cache, history }: Props,
  callbacks: {
    afterAll?: () => void;
    onSuccess?: (props: {
      response: any;
      errors: any;
      route: Muxa.Route;
    }) => void;
  }
) {
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
      cache.toggleRouteLoading(route.path);
      let response = await route.loader({
        params: route.params,
        addError,
        globalData: cache.globalData,
      });
      // Redirect function was called
      if (typeof response === "function") {
        return response(cache, history);
      }
      cache.updateRoute(route.path, { errors, routeData: response });
      callbacks.onSuccess && callbacks.onSuccess({ errors, response, route });
    } catch (err) {
      // Do something with the error?
      console.error(err);
    } finally {
      cache.toggleRouteLoading(route.path);
      callbacks.afterAll && callbacks.afterAll();
    }
  };
}
