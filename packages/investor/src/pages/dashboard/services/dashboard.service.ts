import { InvestorRootState } from "reducers";
import { Dispatch } from "redux";
import dashboardFundsTableSelector from "shared/components/dashboard/dashboard-assets/dashboard-funds/dashboard-funds.selector";
import { composeRequestFiltersByTableState } from "shared/components/table/services/table.service";
import authService from "shared/services/auth-service";

import * as actions from "../actions/dashboard.actions";
import { dashboardCopytradingTableSelector } from "../components/dashboard-assets/dashboard-copytrading.selectors";
import {
  // getDashboardCopytrading,
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

export const getAssetsCounts = () => (
  dispatch: Dispatch,
  getState: () => InvestorRootState
) => {
  const commonFiltering = { take: 0 };

  const fundsCountFilters = composeRequestFiltersByTableState(
    dashboardFundsTableSelector(getState())
  );
  // dispatch(getDashboardFunds({ ...fundsCountFilters, ...commonFiltering }));

  const copytradingCountFilters = composeRequestFiltersByTableState(
    dashboardCopytradingTableSelector(getState())
  );
  // dispatch(
  //   getDashboardCopytrading({ ...copytradingCountFilters, ...commonFiltering })
  // );
};
