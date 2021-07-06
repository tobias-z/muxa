export type RouteData<Data, Errors> = {
  data?: Data;
  runLoader: () => Promise<unknown>;
  errors: Errors;
  isLoading: boolean;
};
