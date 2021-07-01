import type { RouteProps } from "react-router-dom";

// Any used so that developer can choose if he wants to type it
export type LoaderFunction<Params = any> = (
  helpers: LoaderHelpers<Params>
) => Promise<{
  data: unknown;
  errors?: unknown;
}>;

type LoaderHelpers<T> = {
  params: T;
};

type LoadedProps = {
  loader: LoaderFunction<any>;
};

export type LoadedRouteProps = RouteProps & LoadedProps;
