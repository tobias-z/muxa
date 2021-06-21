import type { RouteProps } from "react-router-dom";

type SSRProps = {
  post?: () => Promise<void>;
  get?: <T extends { [K in keyof T]?: string }>(params: T) => Promise<unknown>;
};

export type SSRRouteProps = RouteProps & SSRProps;
