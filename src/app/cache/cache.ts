import type * as Muxa from "../../types";

export default class Cache {
  cache: Map<Muxa.Path, Muxa.Route> = new Map();

  addRoute = (path: Muxa.Path, action: Muxa.AddRoute): void => {
    let route: Muxa.Route = {
      ...action,
      isLoading: false,
      errors: {},
      routeData: null,
    };
    this.cache.set(path, route);
  };

  getRoute = (path: Muxa.Path): Muxa.Route | undefined => {
    return this.cache.get(path);
  };
}
