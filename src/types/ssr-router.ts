import type { ReactChild, ReactFragment, ReactPortal } from "react";
import type { Get } from "./ssr-route";

export type Path = string | readonly string[] | undefined;

export type Route = {
  path: Path;
  routeData?: unknown;
  errors?: unknown;
  isLoading: boolean;
  get: Get<unknown>;
};

export type RouterState = {
  paths: Array<Route>;
};

export type RouterContext = {
  routes: RouterState;
  dispatch: React.Dispatch<RouterActions>;
  fallback: ReactChild | ReactFragment | ReactPortal;
};

type AddRoute = {
  type: "ADD_ROUTE";
  path: Path;
  get: Get<unknown>;
};

type AddRouteData = {
  type: "ADD_ROUTE_DATA";
  path: Path;
  routeData: unknown;
  errors: unknown;
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
