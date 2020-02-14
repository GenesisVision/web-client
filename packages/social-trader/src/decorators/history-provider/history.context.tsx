import React from "react";

export const HistoryContext: React.Context<IHistoryContext> = React.createContext<
  IHistoryContext
>({
  from: undefined
});

export default HistoryContext;

export interface IHistoryContext {
  from: string | undefined;
}
