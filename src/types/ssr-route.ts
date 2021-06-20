import type { RouteProps } from "react-router-dom";

type SSRProps = {
  post?: () => void;
  get?: () => unknown;
};

export type SSRRouteProps = RouteProps & SSRProps;
