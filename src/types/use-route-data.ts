export type RouteData<Data, Errors> = {
  data?: Data;
  getter: () => Promise<unknown>;
  errors?: Errors;
};
