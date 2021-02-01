import * as React from "react";
import { createContext, useMemo, useState } from "react";

interface ApiKeysState {
  tableKey?: string;
  updateTable: () => void;
}

export const ApiKeysInitialState: ApiKeysState = {
  updateTable: () => {}
};

export const ApiKeysContext = createContext<ApiKeysState>(ApiKeysInitialState);

export const ApiKeysContextProvider: React.FC = ({ children }) => {
  const [tableKey, updateTable] = useState<string>(
    String(new Date().getMilliseconds())
  );

  const value = useMemo(
    () => ({
      tableKey,
      updateTable: () => updateTable(String(new Date().getMilliseconds()))
    }),
    [tableKey, updateTable]
  );

  return (
    <ApiKeysContext.Provider value={value}>{children}</ApiKeysContext.Provider>
  );
};
