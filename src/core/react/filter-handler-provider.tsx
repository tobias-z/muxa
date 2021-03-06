import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { FilterHandler } from "../filters/filter-handler";
import invariant from "../invariant";
import Filter from "../filters/filter";

export function FilterHandlerProvider({
  children,
  filters,
}: {
  children: ReactNode;
  filters: Array<Filter> | undefined;
}) {
  const filter = new FilterHandler(filters || []);
  return (
    <FilterHandlerContext.Provider value={filter}>
      {children}
    </FilterHandlerContext.Provider>
  );
}
const FilterHandlerContext = createContext<FilterHandler | undefined>(
  undefined
);

export function useFilterHandler() {
  const context = useContext(FilterHandlerContext);
  invariant(context, "No FilterHandler was found in context");
  return context;
}
