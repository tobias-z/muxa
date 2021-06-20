import type { RouteProps } from "react-router-dom";

type SSRProps = {
  post?: () => Promise<void>;
  get?: () => Promise<unknown>;
};

export type SSRRouteProps = RouteProps & SSRProps;
