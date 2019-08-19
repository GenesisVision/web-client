import { FundAssetsListInfo, ReallocationsViewModel } from "gv-api-web";
import { Dispatch } from "redux";
import { ChartDefaultPeriod } from "shared/components/chart/chart-period/chart-period.helpers";
import { HistoryCountsType } from "shared/components/programs/program-details/program-details.types";
import { fetchPortfolioEvents } from "shared/components/programs/program-details/services/program-details.service";
import { FilteringType } from "shared/components/table/components/filtering/filter.type";
import { RootState } from "shared/reducers/root-reducer";
import {
  FUNDS_SLUG_URL_PARAM_NAME,
  FUND_DETAILS_ROUTE
} from "shared/routes/funds.routes";
import fundsApi from "shared/services/api-client/funds-api";
import managerApi from "shared/services/api-client/manager-api";
import authService from "shared/services/auth-service";
import getParams from "shared/utils/get-params";
import { CurrencyEnum, MiddlewareDispatch } from "shared/utils/types";

import {
  fetchFundBalanceChartAction,
  fetchFundDescriptionAction,
  fetchFundProfitChartAction
} from "../actions/fund-details.actions";

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

export const fetchFundReallocateHistory = (
  fundId: string,
  filters?: FilteringType
): Promise<ReallocationsViewModel> => {
  return fundsApi.v10FundsByIdReallocationsGet(fundId, filters);
};

export const fetchEventsCounts = (id: string): Promise<HistoryCountsType> => {
  const isAuthenticated = authService.isAuthenticated();
  const filtering = { take: 0 };
  const eventsCountPromise = isAuthenticated
    ? fetchPortfolioEvents({ ...filtering, assetId: id })
    : Promise.resolve({ total: 0 });
  const reallocateCountPromise = fetchFundReallocateHistory(id, filtering);
  return Promise.all([eventsCountPromise, reallocateCountPromise]).then(
    ([eventsData, reallocateData]) => ({
      eventsCount: eventsData.total,
      reallocateCount: reallocateData.total
    })
  );
};

export const getProfitChart = ({
  id,
  period,
  currencies
}: TGetProfitChartArgs) => (dispatch: Dispatch) =>
  dispatch(fetchFundProfitChartAction(id, period, currencies));

export const getBalanceChart = ({ id, period }: TGetChartArgs) => (
  dispatch: Dispatch
) => {
  dispatch(fetchFundBalanceChartAction(id, period));
};

interface TGetProfitChartArgs extends TGetChartArgs {
  currencies: CurrencyEnum[];
}

interface TGetChartArgs {
  id: string;
  period?: ChartDefaultPeriod;
}
