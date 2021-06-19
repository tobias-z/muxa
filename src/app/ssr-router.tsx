import type * as Muxa from "../types";
import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useReducer,
} from "react";
import { BrowserRouter } from "react-router-dom";

let initialContext = {
  routes: {
    paths: [],
  },
  dispatch: () => ({
    paths: [],
  }),
};

let RouterContext = createContext<Muxa.RouterContext>(initialContext);

export function useRouterContext(): Muxa.RouterContext {
  let context = useContext(RouterContext);
  if (!context)
    throw Error("You must wrap your SSRRoutes inside of a SSRRouter");
  return context;
}

const routerReducer: Muxa.RouterReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ROUTE": {
      return {
        paths: [...state.paths, action.path],
      };
    }
    default:
      throw Error("Unknown action: " + action.type);
  }
};

export function SSRRouter({ children }: { children: ReactNode }) {
  let [routes, dispatch] = useReducer<Muxa.RouterReducer>(routerReducer, {
    paths: [],
  });

  let values = useMemo(
    () => ({
      routes,
      dispatch,
    }),
    [routes]
  );

  return (
    <BrowserRouter>
      <RouterContext.Provider value={values}>{children}</RouterContext.Provider>
    </BrowserRouter>
  );
}
