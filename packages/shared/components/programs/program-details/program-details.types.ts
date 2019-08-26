import {
  DashboardPortfolioEvent,
  LevelsParamsInfo,
  ManagerPortfolioEvent,
  ProgramDetailsFull
} from "gv-api-web";
import React from "react";
import { IDialogProps } from "shared/components/dialog/dialog";
import { SelectFilterValue } from "shared/components/table/components/filtering/filter.type";
import { TableItems } from "shared/components/table/helpers/mapper";
import { CurrencyEnum } from "shared/utils/types";

export interface IProgramControlsProps {
  isAuthenticated: boolean;
  redirectToLogin(): void;
  programDescription: ProgramDetailsFull;
  levelsParameters: LevelsParamsInfo;
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

export interface IHistorySection {
  fetchPortfolioEvents(
    filters: any
  ): Promise<TableItems<DashboardPortfolioEvent | ManagerPortfolioEvent>>;
  fetchHistoryCounts(id: string): Promise<HistoryCountsType>;
  eventTypeFilterValues: SelectFilterValue[];
}

export interface IProgramReinvestingContainerOwnProps {
  programId: string;
  isReinvesting: boolean;
}
export interface IChangePasswordTradingAccountProps {
  programDescription: ProgramDetailsFull;
}

export interface ILevelCalculatorProps {
  id: string;
  title: string;
  currency: string;
  levelsParameters: LevelsParamsInfo;
  isKycConfirmed: boolean;
}
