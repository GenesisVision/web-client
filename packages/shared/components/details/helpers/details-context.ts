import React from "react";

export interface IProgramDetailContext {
  updateDetails(): void;
}
export const ProgramDetailContext: React.Context<
  IProgramDetailContext
> = React.createContext({
  updateDetails: () => {}
});
