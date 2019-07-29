import React from "react";

export interface IFundDetailContext {
  updateDescription(): void;
  isKycConfirmed: boolean;
}
export const FundDetailContext: React.Context<
  IFundDetailContext
> = React.createContext({
  updateDescription: () => {},
  isKycConfirmed: false
});
