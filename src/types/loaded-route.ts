import type { RouteProps } from "react-router-dom";
import type { FormMethods } from "./form";

export type Redirect = () => void;

export type RedirectFunction = (path: string) => Redirect;

// Any used so that developer can choose if he wants to type it
export type LoaderFunction<Params = any> = (
  helpers: LoaderHelpers<Params>
) => Promise<Record<string, unknown>>;

export type ActionFunction<FormBody = any> = (
  helpers: ActionHelpers<FormBody>
) => Promise<Redirect>;

type AddErrorFunction = (key: string, value: any) => void;
type AddDataFunction = (key: string, value: any) => void;

interface LoaderHelpers<T> {
  params: T;
  addError: AddErrorFunction;
}

interface ActionHelpers<FormBody> {
  params: Params;
  body: FormBody;
  method: FormMethods;
  addError: AddErrorFunction;
  addData: AddDataFunction;
  redirect: RedirectFunction;
}

export type Params = {
  [K in keyof string]?: string;
};

interface LoadedProps {
  loader?: LoaderFunction<any>;
  action?: ActionFunction<any>;
}

export type LoadedRouteProps = RouteProps & LoadedProps;
