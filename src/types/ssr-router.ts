import type { ReactChild, ReactFragment, ReactPortal } from "react";
import type { Get } from "./ssr-route";

export type Path = string | readonly string[] | undefined;

export type RouteData = {
  path: Path;
  routeData?: unknown;
  isLoading: boolean;
  get: Get;
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
  get: Get;
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

type UpdateRouteData = {
  type: "UPDATE_ROUTE_DATA";
  path: Path;
  routeData: unknown;
};

export type RouterActions =
  | AddRoute
  | AddRouteData
  | SetLoading
  | UpdateRouteData;

export type RouterReducer = (
  state: RouterState,
  action: RouterActions
) => RouterState;
