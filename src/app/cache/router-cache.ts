import type * as Muxa from "../../types";
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
    if (!route) return;
    this.cache.set(path, { ...route, isLoading: !route.isLoading });
  };

  updateRoute = (path: Muxa.Path, action: Muxa.UpdateRoute): void => {
    let currentRoute = this.get(path);
    if (!currentRoute) return;
    let updatedRoute: Muxa.Route = {
      ...currentRoute,
      ...action,
    };
    this.cache.set(path, updatedRoute);
  };
}
