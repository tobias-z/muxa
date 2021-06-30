import type { RouteProps } from "react-router-dom";

export type LoaderFunction<Params = unknown> = (
  helpers: LoaderHelpers<Params>
) => Promise<{
  data: unknown;
  errors?: unknown;
}>;

type LoaderHelpers<T> = {
  params: T;
};

type LoadedProps = {
  loader: LoaderFunction<unknown>;
};

export type LoadedRouteProps = RouteProps & LoadedProps;
