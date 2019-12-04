import { IDialogProps } from "components/dialog/dialog";
import { FollowDetailsFull, ProgramDetailsFull } from "gv-api-web";
import React from "react";
import { CurrencyEnum } from "utils/types";

export interface IFollowControlsProps {
  canCloseAsset?: boolean;
  isOwnProgram?: boolean;
  canWithdraw?: boolean;
  canInvest?: boolean;
  canMakeSignalProvider?: boolean;
  isAuthenticated: boolean;
  description: FollowDetailsDataType;
}

export interface IFollowWithdrawalContainerProps extends IDialogProps {
  id: string;
  assetCurrency: CurrencyEnum;
  accountCurrency: CurrencyEnum;
  onSubmit: () => void;
}

export interface IDescriptionSection {
  Controls: React.ComponentType<IFollowControlsProps>;
  WithdrawContainer: React.ComponentType<IFollowWithdrawalContainerProps>;
}

export type FollowDetailsDataType = FollowDetailsFull;
