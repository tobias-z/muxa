import type * as Muxa from "../../types";
import invariant from "../invariant";
import { getExpirationDate } from "../react/utils";
import GlobalData from "./global-data";
import History from "./history";

export default class RouterCache<TGlobalData = any> {
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
  readonly globalData: GlobalData;

  constructor() {
    this.cache = new Map();
    this.history = new History();
    this.globalData = new GlobalData<TGlobalData>();
  }

  put(path: Muxa.Path, action: Muxa.AddRoute): void {
    let route: Muxa.Route = {
      ...action,
      isLoading: false,
      isRedirect: false,
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

  sendRedirect(path: Muxa.Path) {
    let route = this.get(path);
    invariant(
      route,
      `A redirect was made to path: '${path}'. But no route with that path was found`
    );
    this.cache.set(path, { ...route, isRedirect: true });
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
      isRedirect: false,
      expires: getExpirationDate({
        params: currentRoute.params,
        meta: currentRoute.meta,
      }),
      routeData: action.routeData,
      errors: {
        ...currentRoute.errors,
        ...action.errors,
      },
    };
    this.cache.set(path, updatedRoute);
  }
}
