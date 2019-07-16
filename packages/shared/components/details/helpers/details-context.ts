import React from "react";

export interface IProgramDetailContext {
  updateDescription(): void;
  isKycConfirmed: boolean;
}
export const ProgramDetailContext: React.Context<
  IProgramDetailContext
> = React.createContext({
  updateDescription: () => {},
  isKycConfirmed: false
});
