export type RouteData<Data, Errors> = {
  data?: Data;
  get: () => Promise<unknown>;
  errors?: Errors;
};
