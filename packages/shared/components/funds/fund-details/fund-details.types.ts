import {
  DashboardPortfolioEvent,
  FundDetailsFull,
  ManagerPortfolioEvent
} from "gv-api-web";
import React from "react";
import { IDialogProps } from "shared/components/dialog/dialog";
import { SelectFilterValue } from "shared/components/table/components/filtering/filter.type";
import { TableItems } from "shared/components/table/helpers/mapper";
import { CurrencyEnum } from "shared/utils/types";

export interface IDescriptionSection {
  FundWithdrawalContainer: React.ComponentType<IFundWithdrawalContainerProps>;
  FundControls: React.ComponentType<IFundControlsProps>;
}

export interface IFundWithdrawalContainerProps extends IDialogProps {
  id: string;
  accountCurrency: CurrencyEnum;
  assetCurrency: CurrencyEnum;
  onSubmit(): void;
}

export interface IFundControlsProps {
  isAuthenticated: boolean;
  fundDescription: FundDetailsFull;
}

export interface IFundHistorySection {
  fetchPortfolioEvents(
    filters: any
  ): Promise<TableItems<DashboardPortfolioEvent | ManagerPortfolioEvent>>;
  eventTypeFilterValues: SelectFilterValue[];
}
