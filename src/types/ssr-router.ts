import type { ReactChild, ReactFragment, ReactPortal } from "react";

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

export type RouterActions = AddRoute | AddRouteData;

export type RouterReducer = (
  state: RouterState,
  action: RouterActions
) => RouterState;
