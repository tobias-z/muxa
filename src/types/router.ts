import type { ReactNode } from "react";
import type { LoaderFunction } from "./loaded-route";
import type { BrowserRouterProps } from "react-router-dom";

export type Path = string | readonly string[] | undefined;

type MuxaProps = {
  children: ReactNode;
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
