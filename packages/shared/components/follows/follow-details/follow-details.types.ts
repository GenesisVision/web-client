import { LevelsParamsInfo, ProgramDetailsFullOld } from "gv-api-web";
import React from "react";
import { IDialogProps } from "shared/components/dialog/dialog";
import { CurrencyEnum } from "shared/utils/types";

import { WithBlurLoaderProps } from "../../../decorators/with-blur-loader";

export interface IProgramControlsProps
  extends WithBlurLoaderProps<LevelsParamsInfo> {
  canCloseAsset?: boolean;
  isOwnProgram?: boolean;
  canWithdraw?: boolean;
  canInvest?: boolean;
  canMakeSignalProvider?: boolean;
  isAuthenticated: boolean;
  programDescription: ProgramDetailsFullOld;
  data: LevelsParamsInfo;
}

export interface IProgramWithdrawalContainerProps extends IDialogProps {
  id: string;
  assetCurrency: CurrencyEnum;
  accountCurrency: CurrencyEnum;
  onSubmit(): void;
}

export interface IDescriptionSection {
  ProgramControls: React.ComponentType<IProgramControlsProps>;
  ProgramWithdrawContainer: React.ComponentType<
    IProgramWithdrawalContainerProps
  >;
  ProgramReinvestingWidget?: React.ComponentType<
    IProgramReinvestingContainerOwnProps
  >;
}

export type HistoryCountsType = {
  eventsCount?: number;
  tradesCount?: number;
  openPositionsCount?: number;
  reallocateCount?: number;
  subscriptionsCount?: number;
  periodHistoryCount?: number;
};

export interface IProgramReinvestingContainerOwnProps {
  programId: string;
  isReinvesting: boolean;
}
export interface IChangePasswordTradingAccountProps {
  programDescription: ProgramDetailsFullOld;
}

export interface ILevelCalculatorProps {
  id: string;
  title: string;
  currency: string;
  levelsParameters: LevelsParamsInfo;
  isKycConfirmed: boolean;
}
