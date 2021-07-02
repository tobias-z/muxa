import type { LoaderFunction } from "./loaded-route";
import type { Path, RouteErrors } from "./router";

export interface AddRoute {
  path: Path;
  loader: LoaderFunction<any>;
}

export interface UpdateRoute {
  routeData: unknown;
  errors: RouteErrors;
}
