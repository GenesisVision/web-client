import { TGetChartFunc } from "components/details/details-statistic-section/details.chart.types";
import { ComposeFiltersAllType } from "components/table/components/filtering/filter.type";
import { composeRequestFiltersByTableState } from "components/table/services/table.service";
import { TradesSignalViewModel, TradesViewModel } from "gv-api-web";
import { AccountSubscriptionsType } from "pages/accounts/account-details/services/account-details.types";
import { RootState } from "reducers/root-reducer";
import { Dispatch } from "redux";
import { api } from "services/api-client/swagger-custom-client";
import {
  ActionType,
  MiddlewareDispatch,
  NextPageWithReduxContext
} from "utils/types";

import {
  fetchAccountAbsoluteProfitChartAction,
  fetchAccountBalanceChartAction,
  fetchAccountDescriptionAction,
  fetchAccountProfitChartAction,
  fetchOpenPositionsAction,
  fetchTradesAction,
  setAccountIdAction
} from "../actions/account-details.actions";
import { tradesTableSelector } from "../reducers/account-history.reducer";

export const fetchAccountSubscriptions = (
  id: string
): Promise<AccountSubscriptionsType> => {
  return api
    .follows()
    .getFollowSubscriptionsForOwnAccount(id, {
      onlyActive: true
    })
    .then(({ items }) => items);
};

export const fetchAccountDescriptionCtx = (
  id: string,
  ctx?: NextPageWithReduxContext
) => api.accounts(ctx?.token).getTradingAccountDetails(id);

export const dispatchAccountDescription = (id: string) => (
  ctx?: NextPageWithReduxContext
) => async (dispatch: MiddlewareDispatch) => {
  return await dispatch(fetchAccountDescriptionAction(id, ctx?.token));
};

export const dispatchAccountId = (id: string) => async (
  dispatch: MiddlewareDispatch
) => await dispatch(setAccountIdAction(id));

export const getOpenPositions = (id: string) => (
  filters: ComposeFiltersAllType
): ActionType<Promise<TradesViewModel>> => {
  return fetchOpenPositionsAction(id, filters);
};

export const getTrades = (id: string) => (
  filters: ComposeFiltersAllType
): ActionType<Promise<TradesSignalViewModel>> => {
  return fetchTradesAction(id, filters);
};

export const getAccountHistoryCounts = (id: string) => (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  const commonFiltering = { take: 0 };

  const tradesFilters = composeRequestFiltersByTableState(
    tradesTableSelector(getState())
  );
  dispatch(
    getTrades(id)({
      ...tradesFilters,
      ...commonFiltering
    })
  );
};

export const getProfitChart: TGetChartFunc = ({
  id,
  period,
  currencies
}) => async dispatch =>
  await dispatch(fetchAccountProfitChartAction(id, period, currencies));

export const getAbsoluteProfitChart: TGetChartFunc = ({
  id,
  period,
  currencies
}) => async dispatch =>
  await dispatch(
    fetchAccountAbsoluteProfitChartAction(id, period, currencies[0])
  );

export const getBalanceChart: TGetChartFunc = ({
  id,
  period,
  currencies
}) => async dispatch => {
  await dispatch(fetchAccountBalanceChartAction(id, period, currencies[0]));
};
