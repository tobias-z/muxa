import type { ReactNode } from "react";
import type { ActionFunction, LoaderFunction, Params } from "./loaded-route";
import type { BrowserRouterProps } from "react-router-dom";

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
  routeData?: Record<string, unknown> | null;
  errors?: RouteErrors;
  isLoading: boolean;
  loader?: LoaderFunction<any>;
  action?: ActionFunction<any>;
  Component: ReactNode;
}
