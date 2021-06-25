import { Children, isValidElement, ReactNode, useEffect } from "react";
import { Switch, useRouteMatch } from "react-router-dom";
import { useRouterContext } from "./ssr-router";

export default function SSRSwitch({ children }: { children: ReactNode }) {
  let { dispatch } = useRouterContext();
  let { path: currentPath } = useRouteMatch();

  useEffect(() => {
    Children.map(children, child => {
      if (isValidElement(child)) {
        let { path, getter } = child.props;
        if (!path) return;
        // Will not add it again if rerendered
        if (path === currentPath) return;
        dispatch({ type: "ADD_ROUTE", path, getter });
      }
    });
  }, []);

  return <Switch>{children}</Switch>;
}
