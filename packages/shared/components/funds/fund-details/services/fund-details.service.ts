import { FundAssetsListInfo, ReallocationsViewModel } from "gv-api-web";
import { Dispatch } from "redux";
import { ChartDefaultPeriod } from "shared/components/chart/chart-period/chart-period.helpers";
import {
  PORTFOLIO_EVENTS_DEFAULT_FILTERING,
  PORTFOLIO_EVENTS_FILTERS
} from "shared/components/portfolio-events-table/portfolio-events-table.constants";
import { HistoryCountsType } from "shared/components/programs/program-details/program-details.types";
import {
  EVENT_LOCATION,
  fetchPortfolioEvents
} from "shared/components/programs/program-details/services/program-details.service";
import { FilteringType } from "shared/components/table/components/filtering/filter.type";
import { composeRequestFilters } from "shared/components/table/services/table.service";
import { RootState } from "shared/reducers/root-reducer";
import {
  FUND_DETAILS_ROUTE,
  FUNDS_SLUG_URL_PARAM_NAME
} from "shared/routes/funds.routes";
import fundsApi from "shared/services/api-client/funds-api";
import authService from "shared/services/auth-service";
import getParams from "shared/utils/get-params";
import { CurrencyEnum, MiddlewareDispatch } from "shared/utils/types";

import {
  fetchFundBalanceChartAction,
  fetchFundDescriptionAction,
  fetchFundProfitChartAction,
  fundReallocateHistoryAction
} from "../actions/fund-details.actions";
import {
  FUND_REBALANCING_DEFAULT_FILTERS,
  FUND_REBALANCING_FILTERS
} from "../fund-details.constants";

export const dispatchFundDescription = () => (
  dispatch: MiddlewareDispatch,
  getState: () => RootState
) => {
  const authorization = authService.getAuthArg();
  const { router } = getState();

  const slugUrl = getParams(router.location.pathname, FUND_DETAILS_ROUTE)[
    FUNDS_SLUG_URL_PARAM_NAME
  ];

  return dispatch(fetchFundDescriptionAction(slugUrl, authorization));
};

export const fetchFundStructure = (
  fundId: string
): Promise<FundAssetsListInfo> => {
  return fundsApi.v10FundsByIdAssetsGet(fundId);
};

export const fetchEventsCounts = (id: string): Promise<HistoryCountsType> => {
  const isAuthenticated = authService.isAuthenticated();
  const paging = { itemsOnPage: 0 };
  const eventsFiltering = composeRequestFilters({
    paging,
    filtering: PORTFOLIO_EVENTS_DEFAULT_FILTERING,
    defaultFilters: PORTFOLIO_EVENTS_FILTERS
  });
  const eventsCountPromise = isAuthenticated
    ? fetchPortfolioEvents(EVENT_LOCATION.Asset)({
        ...eventsFiltering,
        assetId: id
      })
    : Promise.resolve({ total: 0 });

  const reallocateHistoryFilters = composeRequestFilters({
    paging,
    filtering: FUND_REBALANCING_FILTERS,
    defaultFilters: FUND_REBALANCING_DEFAULT_FILTERS
  });
  /*const reallocateCountPromise = fetchFundReallocateHistory(
    id,
    reallocateHistoryFilters
  );*/
  return Promise.all([eventsCountPromise /*, reallocateCountPromise*/]).then(
    ([eventsData, reallocateData]) => ({
      eventsCount: eventsData.total,
      reallocateCount: reallocateData.total
    })
  );
};

export const getFundReallocateHistory = (
  fundId: string,
  filters?: FilteringType
) => (dispatch: Dispatch) => {
  dispatch(fundReallocateHistoryAction(fundId, filters));
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
