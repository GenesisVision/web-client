import { IDialogProps } from "components/dialog/dialog";
import { PrivateTradingAccountFull } from "gv-api-web";
import React from "react";
import { CurrencyEnum } from "utils/types";

export interface IAccountControlsProps {
  canCloseAsset?: boolean;
  isOwnProgram?: boolean;
  canWithdraw?: boolean;
  canInvest?: boolean;
  canMakeSignalProvider?: boolean;
  isAuthenticated: boolean;
  description: AccountDetailsDataType;
}

export interface IAccountWithdrawalContainerProps extends IDialogProps {
  id: string;
  assetCurrency: CurrencyEnum;
  accountCurrency: CurrencyEnum;
  onSubmit: () => void;
}

export interface IDescriptionSection {
  Controls: React.ComponentType<IAccountControlsProps>;
  WithdrawContainer: React.ComponentType<IAccountWithdrawalContainerProps>;
}

export type AccountDetailsDataType = PrivateTradingAccountFull;
