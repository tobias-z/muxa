import type { ReactNode } from "react";
import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
  Params,
} from "./loaded-route";
import type { BrowserRouterProps } from "react-router-dom";
import type { Routes } from "./route-config";

export type Path = string | readonly string[] | undefined;

interface MuxaProps {
  children: ReactNode;
}

export type RouterProps = BrowserRouterProps & MuxaProps;

export type RouteErrors = {
  [K in keyof any]?: unknown;
};

export interface Route {
  path: Path;
  params: Params;
  routeData?: unknown | null;
  errors?: RouteErrors;
  isLoading: boolean;
  loader?: LoaderFunction<any>;
  action?: ActionFunction<any>;
  meta?: MetaFunction;
  routes?: Routes;
}
