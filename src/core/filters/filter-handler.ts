import Filter from "./filter";

export class FilterHandler {
  private readonly _filters: Array<Filter>;

  constructor(filters: Array<Filter>) {
    this._filters = filters;
  }

  public callFilters(path: string): boolean {
    for (const filter of this._filters) {
      const shouldRunFilter = path.includes(filter.filterPath);
      if (!shouldRunFilter) continue;
      if (!filter.doFilter()) {
        return false;
      }
    }
    return true;
  }
}
