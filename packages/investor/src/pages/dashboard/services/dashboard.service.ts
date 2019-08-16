import { InvestorRootState } from "reducers";
import { Dispatch } from "redux";
import dashboardFundsTableSelector from "shared/components/dashboard/dashboard-assets/dashboard-funds/dashboard-funds.selector";
import { composeRequestFilters } from "shared/components/table/services/table.service";
import authService from "shared/services/auth-service";

import * as actions from "../actions/dashboard.actions";
import { dashboardCopytradingTableSelector } from "../components/dashboard-assets/dashboard-copytrading.selectors";
import {
  getDashboardCopytrading,
  getDashboardFunds
} from "./dashboard-assets.service";

export const getPortfolioChart = () => (dispatch: Dispatch) => {
  const authorization = authService.getAuthArg();

  dispatch(actions.fetchPortfolioChartAction(authorization));
};

export interface IDashboardAssetsCounts {
  programsCount?: number;
  fundsCount?: number;
  tradesCount?: number;
}

const getFundsCountFilters = (getState: () => InvestorRootState) => {
  const { filters, defaults } = dashboardFundsTableSelector(getState());
  const requestFilters = composeRequestFilters({
    ...filters,
    defaultFilters: defaults.defaultFilters
  });
  return requestFilters;
};

const getCopytradingCountFilters = (getState: () => InvestorRootState) => {
  const { filters, defaults } = dashboardCopytradingTableSelector(getState());
  const requestFilters = composeRequestFilters({
    ...filters,
    defaultFilters: defaults.defaultFilters
  });
  return requestFilters;
};

export const getAssetsCounts = () => (
  dispatch: Dispatch,
  getState: () => InvestorRootState
) => {
  const commonFiltering = { take: 0 };

  const fundsCountFilters = getFundsCountFilters(getState);
  dispatch(getDashboardFunds({ ...fundsCountFilters, ...commonFiltering }));

  const copytradingCountFilters = getCopytradingCountFilters(getState);
  dispatch(
    getDashboardCopytrading({ ...copytradingCountFilters, ...commonFiltering })
  );
};
