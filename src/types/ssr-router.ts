export type RouterState = {
  paths: Array<string>;
};

export type RouterContext = {
  routes: RouterState;
  dispatch: React.Dispatch<RouterActions>;
};

type AddRoute = {
  type: "ADD_ROUTE";
  path: string;
};

export type RouterActions = AddRoute;

export type RouterReducer = (
  state: RouterState,
  action: RouterActions
) => RouterState;
