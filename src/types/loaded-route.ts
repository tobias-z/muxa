import type { RouteProps } from "react-router-dom";

// Any used so that developer can choose if he wants to type it
export type LoaderFunction<Params = any> = (
  helpers: LoaderHelpers<Params>
) => Promise<unknown>;

type LoaderHelpers<T> = {
  params: T;
  addError: (key: string, value: any) => void;
};

type LoadedProps = {
  loader: LoaderFunction<any>;
};

export type LoadedRouteProps = RouteProps & LoadedProps;
