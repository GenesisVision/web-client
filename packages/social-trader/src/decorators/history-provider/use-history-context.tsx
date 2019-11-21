import { useContext } from "react";

import HistoryContext, { IHistoryContext } from "./history.context";

const useHistoryContext = (): IHistoryContext => {
  const contextValue = useContext(HistoryContext);
  return contextValue;
};

export default useHistoryContext;
