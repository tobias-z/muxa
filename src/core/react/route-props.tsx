import type * as Muxa from "../../types";
import { ReactNode } from "react";
import { createContext, useContext } from "react";
import { getRealPathname } from "./utils";
import invariant from "../invariant";

const RouteContext = createContext<Muxa.Path | undefined>(undefined);

export function useRoutePath() {
  const context = useContext(RouteContext);
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
  const path = getRealPathname(routePath);

  return <RouteContext.Provider value={path}>{children}</RouteContext.Provider>;
}
