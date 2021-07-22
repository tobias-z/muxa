import type { RouteProps } from "react-router-dom";
import GlobalData from "../core/muxa/cache/global-data";
import type { FormMethods } from "./form";
import type { Routes } from "./route-config";

export type Redirect = () => void;

export type RedirectFunction = (path: string) => Redirect;

// Any used so that developer can choose if he wants to type it
export type LoaderFunction<Params = any> = (
  helpers: LoaderHelpers<Params>
) => Promise<any>;

export type ActionFunction<FormBody = any> = (
  helpers: ActionHelpers<FormBody>
) => Promise<Redirect>;

type AddErrorFunction = (key: string, value: any) => void;

interface LoaderHelpers<T> {
  params: T;
  addError: AddErrorFunction;
  globalData: GlobalData;
}

interface ActionHelpers<FormBody> {
  params: Params;
  body: FormBody;
  method: FormMethods;
  addError: AddErrorFunction;
  globalData: GlobalData;
  redirect: RedirectFunction;
}

export type Params = Record<string, string>;

interface LoadedProps {
  loader?: LoaderFunction<any>;
  action?: ActionFunction<any>;
  routes?: Routes;
}

export type LoadedRouteProps = RouteProps & LoadedProps;
