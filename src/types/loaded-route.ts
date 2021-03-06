import type { RouteProps } from "react-router-dom";
import GlobalData from "../core/cache/global-data";
import RouterCache from "../core/cache/router-cache";
import type { FormMethods } from "./form";
import type { Routes } from "./route-config";
import type { History } from "history";

export type Redirect = (
  cache: RouterCache,
  history: History,
  runLoader?: () => Promise<unknown>
) => void;

export type RedirectFunction = (path: string) => Redirect;

type AddErrorFunction = (key: string, value: any) => void;

// Any used so that developer can choose if he wants to type it
export type LoaderFunction<Params = any> = (
  helpers: LoaderHelpers<Params>
) => Promise<any>;

interface LoaderHelpers<T> {
  params: T;
  addError: AddErrorFunction;
  globalData: GlobalData;
}

export type ActionFunction<FormBody = any> = (
  helpers: ActionHelpers<FormBody>
) => Promise<Redirect>;

interface ActionHelpers<FormBody> {
  params: Params;
  body: FormBody;
  method: FormMethods;
  addError: AddErrorFunction;
  globalData: GlobalData;
}

export type MetaFunction<Params = any> = (helpers: MetaHelpers<Params>) => Meta;

export interface Meta {
  title?: string;
  description?: string;
  expires?: Date;
}

interface MetaHelpers<Params> {
  params: Params;
}

export type Params = Record<string, string>;

interface LoadedProps {
  loader?: LoaderFunction<any>;
  action?: ActionFunction<any>;
  meta?: MetaFunction;
  routes?: Routes;
}

export type LoadedRouteProps = RouteProps & LoadedProps;
