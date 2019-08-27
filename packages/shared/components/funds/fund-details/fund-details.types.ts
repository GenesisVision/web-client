import {
  DashboardPortfolioEvent,
  FundDetailsFull,
  ManagerPortfolioEvent
} from "gv-api-web";
import * as React from "react";
import { IDialogProps } from "shared/components/dialog/dialog";
import { CurrencyEnum } from "shared/utils/types";

import { SelectFilterValue } from "../../table/components/filtering/filter.type";
import { TableItems } from "../../table/helpers/mapper";

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
  redirectToLogin(): void;
  fundDescription: FundDetailsFull;
}

export interface IFundHistorySection {
  fetchPortfolioEvents(
    filters: any
  ): Promise<TableItems<DashboardPortfolioEvent | ManagerPortfolioEvent>>;
  eventTypeFilterValues: SelectFilterValue[];
}
