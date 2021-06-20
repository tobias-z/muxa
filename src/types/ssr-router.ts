export type Path = string | readonly string[] | undefined;

export type RouteData = {
  path: Path;
  routeData?: unknown;
};

export type RouterState = {
  paths: Array<RouteData>;
};

export type RouterContext = {
  routes: RouterState;
  dispatch: React.Dispatch<RouterActions>;
};

type AddRoute = {
  type: "ADD_ROUTE";
  path: Path;
};

export type RouterActions = AddRoute;

export type RouterReducer = (
  state: RouterState,
  action: RouterActions
) => RouterState;
