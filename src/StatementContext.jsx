import { createContext } from "react";

export const StatementContext = createContext({
  statements: null,
  setStatements: null,
  filter: null,
  setFilter: null,
  sortOption: null,
  setSortOption: null
});
