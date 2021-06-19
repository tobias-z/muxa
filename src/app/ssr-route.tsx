import { Route, RouteProps } from "react-router-dom";

////////////////////////////////////////////////////////////////////////////////
// Take context from SSRRouter

export default function SSRRoute(props: RouteProps) {
  return <Route {...props} />;
}
