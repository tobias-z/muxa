import type * as Muxa from "../../types";

export class FilterHandler {
  private readonly _filters: Array<Muxa.Filter>;

  constructor(filters: Array<Muxa.Filter>) {
    this._filters = filters;
  }

  public callFilters(path: string): boolean {
    for (const filter of this._filters) {
      const shouldRunFilter = path.includes(filter.getFilterPath());
      if (!shouldRunFilter) continue;
      if (!filter.doFilter()) {
        return false;
      }
    }
    return true;
  }
}
