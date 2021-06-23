import type * as Muxa from "../types";
import type { ReactChild, ReactFragment, ReactNode, ReactPortal } from "react";
import { createContext, useContext, useMemo, useReducer } from "react";
import { BrowserRouter } from "react-router-dom";

let initialContext = {
  routes: {
    paths: [],
  },
  dispatch: () => ({
    paths: [],
  }),
  fallback: <div>Loading...</div>,
};

let RouterContext = createContext<Muxa.RouterContext>(initialContext);

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
            get: action.get,
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
    case "UPDATE_ROUTE_DATA":
      return {
        paths: state.paths.map(path => {
          if (path.path === action.path) {
            return {
              ...path,
              routeData: action.routeData,
            };
          }
          return path;
        }),
      };
    default:
      throw Error("Unknown routerReducer action");
  }
};

export function SSRRouter({
  children,
  fallback,
}: {
  children: ReactNode;
  fallback: ReactChild | ReactFragment | ReactPortal;
}) {
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
    <BrowserRouter>
      <RouterContext.Provider value={values}>{children}</RouterContext.Provider>
    </BrowserRouter>
  );
}
