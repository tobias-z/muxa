import type { ComponentType } from "react";
import type { ActionFunction, LoaderFunction } from "./loaded-route";

export interface ConfigRoute {
  path: string;
  import?: string;
  Component: ComponentType<any>;
  loader?: LoaderFunction | (() => any);
  action?: ActionFunction | (() => any);
  routes?: Routes;
}

export interface ConfigRouteToString {
  path: string;
  import: string;
  Component: string;
  routes?: RoutesToString;
}

export type Routes = Array<ConfigRoute>;
export type RoutesToString = Array<ConfigRouteToString>;
