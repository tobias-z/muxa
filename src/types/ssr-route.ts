import type { RouteProps } from "react-router-dom";

export type Get<Params = unknown> = (helpers: GetHelpers<Params>) => Promise<{
  data: unknown;
  errors?: unknown;
}>;

type GetHelpers<T> = {
  params: T;
};

type SSRProps = {
  get: Get<unknown>;
};

export type SSRRouteProps = RouteProps & SSRProps;
