import React, { useCallback } from "react";

import HistoryContext from "./history.context";

const HistoryProvider: React.FC<Props> = ({ from, children }) => {
  const getFromRoute = useCallback(() => {
    if (from) {
      return from;
    }
    if (typeof window !== "undefined" && window.history.state.options) {
      return window.history.state.options.from;
    }
    return undefined;
  }, [from]);

  return (
    <HistoryContext.Provider value={{ from: getFromRoute() }}>
      {children}
    </HistoryContext.Provider>
  );
};

export default HistoryProvider;

interface Props {
  from?: string;
}
