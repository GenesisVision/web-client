import React from "react";

export interface IProgramDetailContext {
  updateDetails(): void;
  isKycConfirmed: boolean;
}
export const ProgramDetailContext: React.Context<
  IProgramDetailContext
> = React.createContext({
  updateDetails: () => {},
  isKycConfirmed: false
});
