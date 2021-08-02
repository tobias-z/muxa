import type * as Muxa from "../../../types";
import RouterCache from "../../cache/router-cache";
import invariant from "../../invariant";

interface Props {
  route: Muxa.Route | undefined;
  cache: RouterCache;
  redirect: Muxa.RedirectFunction;
}

export default function getBaseLoader(
  { route, cache, redirect }: Props,
  callbacks?: {
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
        redirect,
      });
      // Redirect function was called
      if (typeof response === "function") {
        return response();
      }
      cache.updateRoute(route.path, { errors, routeData: response });
      callbacks?.onSuccess && callbacks.onSuccess({ errors, response, route });
    } catch (err) {
      // Do something with the error?
      console.error(err.message);
    } finally {
      cache.toggleRouteLoading(route.path);
      callbacks?.afterAll && callbacks.afterAll();
    }
  };
}
