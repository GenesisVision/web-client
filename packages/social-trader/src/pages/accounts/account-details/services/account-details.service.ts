import { TGetChartFunc } from "components/details/details-statistic-section/details.chart.types";
import { ComposeFiltersAllType } from "components/table/components/filtering/filter.type";
import { composeRequestFiltersByTableState } from "components/table/services/table.service";
import { TradesSignalViewModel, TradesViewModel } from "gv-api-web";
import { NextPageContext } from "next";
import { AccountSubscriptionsType } from "pages/accounts/account-details/services/account-details.types";
import { RootState } from "reducers/root-reducer";
import { Dispatch } from "redux";
import { api, Token } from "services/api-client/swagger-custom-client";
import { ActionType, MiddlewareDispatch } from "utils/types";

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
    .follows(Token.create())
    .getFollowSubscriptionsForOwnAccount(id, {
      onlyActive: true
    })
    .then(({ items }) => items);
};

export const fetchAccountDescriptionCtx = (id: string, ctx?: NextPageContext) =>
  api.accounts(Token.create()).getTradingAccountDetails(id);

export const dispatchAccountDescription = (id: string) => (
  ctx?: NextPageContext
) => async (dispatch: MiddlewareDispatch) => {
  return await dispatch(fetchAccountDescriptionAction(id, Token.create(ctx)));
};

export const dispatchAccountId = (id: string) => async (
  dispatch: MiddlewareDispatch
) => await dispatch(setAccountIdAction(id));

export const getOpenPositions = (id: string) => (
  filters: ComposeFiltersAllType
): ActionType<Promise<TradesViewModel>> => {
  const authorization = authService.getAuthArg();
  return fetchOpenPositionsAction(id, filters, authorization);
};

export const getTrades = (id: string) => (
  filters: ComposeFiltersAllType
): ActionType<Promise<TradesSignalViewModel>> => {
  const authorization = authService.getAuthArg();
  return fetchTradesAction(id, filters, authorization);
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
