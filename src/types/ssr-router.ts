import type { ReactChild, ReactFragment, ReactPortal } from "react";

export type Path = string | readonly string[] | undefined;

export type RouteData = {
  path: Path;
  routeData?: unknown;
  isLoading: boolean;
};

export type RouterState = {
  paths: Array<RouteData>;
};

export type RouterContext = {
  routes: RouterState;
  dispatch: React.Dispatch<RouterActions>;
  fallback: ReactChild | ReactFragment | ReactPortal;
};

type AddRoute = {
  type: "ADD_ROUTE";
  path: Path;
};

type AddRouteData = {
  type: "ADD_ROUTE_DATA";
  path: Path;
  routeData: unknown;
};

type SetLoading = {
  type: "TOGGLE_LOADING";
  path: Path;
};

export type RouterActions = AddRoute | AddRouteData | SetLoading;

export type RouterReducer = (
  state: RouterState,
  action: RouterActions
) => RouterState;
