export default class Filter {
  filterPath: string;

  /**
   * @param filterPath Any route after and equal to this value, this filter will be called
   */
  constructor(filterPath?: string) {
    this.filterPath = filterPath ? filterPath : "/";
  }

  doFilter(): boolean {
    return true;
  }
}
