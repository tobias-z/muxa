import type * as Muxa from "../types";
import { createContext, useContext, useMemo } from "react";
import { BrowserRouter } from "react-router-dom";
import RouterCache from "./cache/router-cache";

let RouterCacheContext = createContext<RouterCache | undefined>(undefined);

export function useRouterCache() {
  let context = useContext(RouterCacheContext);
  if (!context) {
    throw new Error("You must wrap your LoadedRoutes inside a Router");
  }
  return context;
}

export function Router({ children, ...props }: Muxa.RouterProps) {
  // useMemo is just another security taken so that we for sure always have the same cache
  let cache = useMemo(() => RouterCache.getInstance(), []);

  return (
    <BrowserRouter {...props}>
      <RouterCacheContext.Provider value={cache}>
        {children}
      </RouterCacheContext.Provider>
    </BrowserRouter>
  );
}
