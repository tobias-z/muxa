import type * as Muxa from "../../types";
import { useEffect, useState } from "react";
import { useRoutePath } from "./route-props";
import { useRouterCache } from "./router";
import LoadedRoute from "./loaded-route";

export default function Outlet() {
  let path = useRoutePath();
  let cache = useRouterCache();
  let [route, setRoute] = useState<Muxa.Route | undefined>();

  useEffect(() => {
    setRoute(cache.get(path));
  }, []);

  if (!route?.routes) return null;

  return (
    <>
      {route.routes.map(route => (
        <LoadedRoute
          key={route.path}
          path={route.path}
          component={route.Component}
          loader={route.loader}
          action={route.action}
          routes={route.routes}
        />
      ))}
    </>
  );
}
