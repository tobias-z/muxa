import type { ReactChild, ReactFragment, ReactNode, ReactPortal } from "react";
import type { LoaderFunction } from "./loaded-route";
import type { BrowserRouterProps } from "react-router-dom";

export type Path = string | readonly string[] | undefined;

type MuxaProps = {
  children: ReactNode;
  fallback: ReactChild | ReactFragment | ReactPortal;
};

export type RouterProps = BrowserRouterProps & MuxaProps;

export type RouteErrors = {
  [K in keyof any]?: unknown;
};

export type Route = {
  path: Path;
  routeData?: unknown;
  errors?: RouteErrors;
  isLoading: boolean;
  loader: LoaderFunction<any>;
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
  loader: LoaderFunction<any>;
};

type AddRouteData = {
  type: "ADD_ROUTE_DATA";
  path: Path;
  routeData: unknown;
  errors: RouteErrors;
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
