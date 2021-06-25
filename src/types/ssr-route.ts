import type { RouteProps } from "react-router-dom";

export type GetterFunction<Params = unknown> = (
  helpers: GetterHelpers<Params>
) => Promise<{
  data: unknown;
  errors?: unknown;
}>;

type GetterHelpers<T> = {
  params: T;
};

type SSRProps = {
  getter: GetterFunction<unknown>;
};

export type SSRRouteProps = RouteProps & SSRProps;
