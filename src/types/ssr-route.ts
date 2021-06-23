import type { RouteProps } from "react-router-dom";

export type Get = <T extends { [K in keyof T]?: string }>(
  params: T
) => Promise<unknown>;

type SSRProps = {
  get: Get;
};

export type SSRRouteProps = RouteProps & SSRProps;
