import type * as Muxa from "../types";
import { createContext, useContext, useMemo, useReducer } from "react";
import { BrowserRouter } from "react-router-dom";

let RouterContext = createContext<Muxa.RouterContext | null>(null);

export function useRouterContext(): Muxa.RouterContext {
  let context = useContext(RouterContext);
  if (!context)
    throw Error("You must wrap your SSRRoutes inside of a SSRRouter");
  return context;
}

let routerReducer: Muxa.RouterReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ROUTE":
      return {
        paths: [
          ...state.paths,
          {
            path: action.path,
            routeData: null,
            errors: null,
            isLoading: false,
            loader: action.loader,
          },
        ],
      };
    case "ADD_ROUTE_DATA":
      return {
        paths: state.paths.map(path => {
          if (path.path === action.path) {
            return {
              ...path,
              routeData: action.routeData,
              errors: action.errors,
            };
          }
          return path;
        }),
      };
    case "TOGGLE_LOADING":
      return {
        paths: state.paths.map(path => {
          if (path.path === action.path) {
            return {
              ...path,
              isLoading: !path.isLoading,
            };
          }
          return path;
        }),
      };
    default:
      throw Error("Unknown routerReducer action");
  }
};

export function Router({ children, fallback, ...props }: Muxa.RouterProps) {
  let [routes, dispatch] = useReducer<Muxa.RouterReducer>(routerReducer, {
    paths: [],
  });

  let values = useMemo(
    () => ({
      routes,
      dispatch,
      fallback,
    }),
    [routes]
  );

  return (
    <BrowserRouter {...props}>
      <RouterContext.Provider value={values}>{children}</RouterContext.Provider>
    </BrowserRouter>
  );
}
