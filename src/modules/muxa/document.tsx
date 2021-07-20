import LoadedRoute from "./loaded-route";
import type * as Muxa from "../../types";
import { Switch } from "react-router-dom";

export default function Document({ routes }: Muxa.DocumentProps) {
  return (
    <Switch>
      {routes.map(route => (
        <LoadedRoute
          key={route.path}
          path={route.path}
          component={route.Component}
          loader={route.loader}
          action={route.action}
          routes={route.routes}
        />
      ))}
    </Switch>
  );
}
