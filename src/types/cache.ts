import type { ActionFunction, LoaderFunction, Params } from "./loaded-route";
import type { Routes } from "./route-config";
import type { Path, RouteErrors } from "./router";

export interface AddRoute {
  path: Path;
  params: Params;
  loader?: LoaderFunction<any>;
  action?: ActionFunction<any>;
  routes?: Routes;
  expires: Date;
}

export interface UpdateRoute {
  routeData?: unknown;
  errors: RouteErrors;
}
