import type * as Muxa from "../../types";
import Cache from "./cache";

export default class RouterCache extends Cache {
  static #instance: RouterCache | undefined;

  // Singleton prevents cache from ever beeing different
  static getInstance = () => {
    if (RouterCache.#instance === undefined) {
      RouterCache.#instance = new RouterCache();
    }
    return RouterCache.#instance;
  };

  toggleRouteLoading = (path: Muxa.Path): void => {
    let route = this.getRoute(path);
    if (!route) return;
    this.cache.set(path, { ...route, isLoading: !route.isLoading });
  };

  updateRoute = (path: Muxa.Path, action: Muxa.UpdateRoute): void => {
    let currentRoute = this.getRoute(path);
    if (!currentRoute) return;
    let updatedRoute: Muxa.Route = {
      ...currentRoute,
      ...action,
    };
    this.cache.set(path, updatedRoute);
  };
}
