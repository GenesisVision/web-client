import {
  DashboardPortfolioEvent,
  ManagerPortfolioEvent,
  ProgramDetailsFull
} from "gv-api-web";
import React from "react";
import { IDialogProps } from "shared/components/dialog/dialog";
import { SelectFilterValue } from "shared/components/table/components/filtering/filter.type";
import { TableItems } from "shared/components/table/helpers/mapper";

export interface IProgramControlsProps {
  isAuthenticated: boolean;
  redirectToLogin(): void;
  programDescription: ProgramDetailsFull;
}

export interface IProgramWithdrawalContainerProps extends IDialogProps {
  id: string;
  assetCurrency: string;
  accountCurrency: string;
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
  ChangePasswordTradingAccount?: React.ComponentType<
    IChangePasswordTradingAccountProps
  >;
}

export type HistoryCountsType = {
  tradesCount: number;
  eventsCount: number;
  openPositionsCount: number;
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
