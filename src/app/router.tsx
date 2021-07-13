import type * as Muxa from "../types";
import { createContext, useContext } from "react";
import type { Context } from "react";
import { BrowserRouter } from "react-router-dom";
import RouterCache from "./cache/router-cache";

declare global {
  interface Window {
    RouterCacheContext: Context<RouterCache | undefined>;
  }
}

let initialContext = createContext<RouterCache | undefined>(undefined);

function getRouterContext() {
  // Keep a singleton of the context
  if (!window.RouterCacheContext) {
    window.RouterCacheContext = initialContext;
  }
  return window.RouterCacheContext;
}

export function useRouterCache() {
  let context = useContext(getRouterContext());
  if (!context) {
    throw new Error("You must wrap your LoadedRoutes inside a Router");
  }
  return context;
}

export function Router({ children, ...props }: Muxa.RouterProps) {
  let cache = RouterCache.getInstance();

  let Context = getRouterContext();

  return (
    <BrowserRouter {...props}>
      <Context.Provider value={cache}>{children}</Context.Provider>
    </BrowserRouter>
  );
}
