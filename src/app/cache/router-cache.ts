import type * as Muxa from "../../types";
import invariant from "../utils/invariant";
import Cache from "./cache";

export default class RouterCache extends Cache {
  private static instance: RouterCache | undefined;

  // Singleton makes sure that we always have the same instance
  static getInstance = () => {
    if (RouterCache.instance === undefined) {
      RouterCache.instance = new RouterCache();
    }
    return RouterCache.instance;
  };

  toggleRouteLoading = (path: Muxa.Path): void => {
    let route = this.get(path);
    /* istanbul ignore next */
    invariant(
      route,
      "A route tried to update before it was added. This is a problem on Muxa's part not yours"
    );
    this.cache.set(path, { ...route, isLoading: !route.isLoading });
  };

  updateRoute = (path: Muxa.Path, action: Muxa.UpdateRoute): void => {
    let currentRoute = this.get(path);
    invariant(
      currentRoute,
      "A route tried to update before it was added. This is a problem on Muxa's part not yours"
    );
    let updatedRoute: Muxa.Route = {
      ...currentRoute,
      ...action,
    };
    this.cache.set(path, updatedRoute);
  };
}
