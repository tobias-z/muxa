import type { ComponentType } from "react";
import type { ActionFunction, LoaderFunction } from "./loaded-route";

export interface ConfigRoute {
  path: string;
  import?: string;
  Component: ComponentType<any>;
  loader?: LoaderFunction | (() => any);
  action?: ActionFunction | (() => any);
}

export interface ConfigRouteToString {
  path: string;
  import: string;
  Component: string;
}

export type Routes = Array<ConfigRoute>;
export type RoutesToString = Array<ConfigRouteToString>;
