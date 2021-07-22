import type * as Muxa from "../../types";
import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";
import { getRealPathname, invariant } from "./utils";

let RouteContext = createContext<Muxa.Path | undefined>(undefined);

export function useRoutePath() {
  let context = useContext(RouteContext);
  invariant(context, "useRoutePath was used outside of a LoadedRoute");
  return context;
}

export function RoutePropsProvider({
  routePath,
  children,
}: {
  routePath: Muxa.Path;
  children: ReactNode;
}) {
  let [path] = useState(() => getRealPathname(routePath));

  return <RouteContext.Provider value={path}>{children}</RouteContext.Provider>;
}
