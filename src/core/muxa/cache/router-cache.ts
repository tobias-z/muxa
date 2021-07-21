import type * as Muxa from "../../../types";
import invariant from "../utils/invariant";
import History from "./history";

export default class RouterCache {
  private static instance: RouterCache | undefined;

  // Singleton makes sure that we always have the same instance
  static getInstance() {
    if (RouterCache.instance === undefined) {
      RouterCache.instance = new RouterCache();
    }
    return RouterCache.instance;
  }

  private readonly cache: Map<Muxa.Path, Muxa.Route>;
  readonly history: History;

  constructor() {
    this.cache = new Map();
    this.history = new History();
  }

  put(path: Muxa.Path, action: Muxa.AddRoute): void {
    let route: Muxa.Route = {
      ...action,
      isLoading: false,
      errors: {},
      routeData: null,
    };
    this.cache.set(path, route);
  }

  get(path: Muxa.Path): Muxa.Route | undefined {
    return this.cache.get(path);
  }

  toggleRouteLoading(path: Muxa.Path): void {
    let route = this.get(path);
    /* istanbul ignore next */
    invariant(
      route,
      "A route tried to update before it was added. This is a problem on Muxa's part not yours"
    );
    this.cache.set(path, { ...route, isLoading: !route.isLoading });
  }

  updateRoute(path: Muxa.Path, action: Muxa.UpdateRoute): void {
    let currentRoute = this.get(path);
    invariant(
      currentRoute,
      "A route tried to update before it was added. This is a problem on Muxa's part not yours"
    );
    let updatedRoute: Muxa.Route = {
      ...currentRoute,
      ...action,
      routeData: {
        ...currentRoute.routeData,
        ...action.routeData,
      },
      errors: {
        ...currentRoute.errors,
        ...action.errors,
      },
    };
    this.cache.set(path, updatedRoute);
  }
}
