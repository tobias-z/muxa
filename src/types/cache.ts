import type { ReactNode } from "react";
import type { ActionFunction, LoaderFunction, Params } from "./loaded-route";
import type { Routes } from "./route-config";
import type { Path, RouteErrors } from "./router";

export interface AddRoute {
  path: Path;
  params: Params;
  loader?: LoaderFunction<any>;
  action?: ActionFunction<any>;
  Component: ReactNode;
  routes?: Routes;
}

export interface UpdateRoute {
  routeData: Record<string, unknown>;
  errors: RouteErrors;
}
