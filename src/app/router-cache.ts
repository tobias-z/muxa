import type * as Muxa from "../types";

export default class RouterCache {
  instance: RouterCache | undefined;

  // Singleton prevents cache from ever beeing different
  getInstance = () => {
    if (this.instance === undefined) {
      this.instance = new RouterCache();
    }
    return this.instance;
  };

  cache: Map<string, Muxa.Route> = new Map();

  addRoute = (path: string, route: Muxa.Route) => {
    this.cache.set(path, route);
  };

  getRoute = (path: string) => {
    this.cache.get(path);
  };
}
