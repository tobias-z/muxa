export interface Filter {
  getFilterPath(): string;
  doFilter(): boolean;
}
