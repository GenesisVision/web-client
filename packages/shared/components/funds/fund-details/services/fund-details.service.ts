import { Dispatch } from "redux";
import { ChartDefaultPeriod } from "shared/components/chart/chart-period/chart-period.helpers";
import {
  ComposeFiltersAllType,
  FilteringType
} from "shared/components/table/components/filtering/filter.type";
import { composeRequestFiltersByTableState } from "shared/components/table/services/table.service";
import { RootState } from "shared/reducers/root-reducer";
import {
  FUNDS_SLUG_URL_PARAM_NAME,
  FUND_DETAILS_ROUTE
} from "shared/routes/funds.routes";
import authService from "shared/services/auth-service";
import getParams from "shared/utils/get-params";
import { CurrencyEnum, DispatchDescriptionType } from "shared/utils/types";

import {
  fetchFundBalanceChartAction,
  fetchFundDescriptionAction,
  fetchFundProfitChartAction,
  fundReallocateHistoryAction,
  fundStructureAction
} from "../actions/fund-details.actions";
import { fundReallocateHistoryTableSelector } from "../reducers/fund-reallocate-history.reducer";

export const dispatchFundDescription: DispatchDescriptionType = () => (
  dispatch,
  getState
) => {
  const authorization = authService.getAuthArg();
  const { router } = getState();

  const slugUrl = getParams(router.location.pathname, FUND_DETAILS_ROUTE)[
    FUNDS_SLUG_URL_PARAM_NAME
  ];

  return dispatch(fetchFundDescriptionAction(slugUrl, authorization));
};

export const getDashboardHistoryDetailsCounts = (fundId: string) => (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  const commonFiltering = { take: 0 };

  const reallocateHistoryCountFilters = composeRequestFiltersByTableState(
    fundReallocateHistoryTableSelector(getState())
  );
  dispatch(
    getFundReallocateHistory(fundId)({
      ...reallocateHistoryCountFilters,
      ...commonFiltering
    })
  );
};

export const getFundReallocateHistory = (fundId: string) => (
  filters?: FilteringType
) => {
  return fundReallocateHistoryAction(fundId, filters);
};

export const getFundStructure = (fundId: string) => (
  filters: ComposeFiltersAllType
) => {
  return fundStructureAction(fundId);
};

export const getProfitChart = ({ id, period, currencies }: TGetChartArgs) => (
  dispatch: Dispatch
) => dispatch(fetchFundProfitChartAction(id, period, currencies));

export const getBalanceChart = ({ id, period, currencies }: TGetChartArgs) => (
  dispatch: Dispatch
) => {
  dispatch(fetchFundBalanceChartAction(id, period, currencies[0]));
};

interface TGetChartArgs {
  currencies: CurrencyEnum[];
  id: string;
  period?: ChartDefaultPeriod;
}
