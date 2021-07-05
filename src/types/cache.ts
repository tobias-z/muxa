import type { ActionFunction, LoaderFunction, Params } from "./loaded-route";
import type { Path, RouteErrors } from "./router";

export interface AddRoute {
  path: Path;
  params: Params;
  loader?: LoaderFunction<any>;
  action?: ActionFunction<any>;
}

export interface UpdateRoute {
  routeData: Record<string, unknown>;
  errors: RouteErrors;
}
