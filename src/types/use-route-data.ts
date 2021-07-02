export type RouteData<Data, Errors> = {
  data?: Data | undefined;
  runLoader: () => Promise<unknown>;
  errors: Errors;
  isLoading: boolean;
};
