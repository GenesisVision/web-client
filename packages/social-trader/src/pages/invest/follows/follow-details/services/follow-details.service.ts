import { TGetChartFunc } from "components/details/details-statistic-section/details.chart.types";
import { NextPageContext } from "next";
import { api, Token } from "services/api-client/swagger-custom-client";
import { MiddlewareDispatch } from "utils/types";

import {
  fetchFollowAbsoluteProfitChartAction,
  fetchFollowBalanceChartAction,
  fetchFollowDescriptionAction,
  fetchFollowProfitChartAction
} from "../actions/follow-details.actions";

export const fetchFollowDescriptionCtx = (id: string, ctx?: NextPageContext) =>
  api.follows(Token.create(ctx)).getFollowAssetDetails(id);

export const dispatchFollowDescription = (id: string) => (
  ctx?: NextPageContext
) => async (dispatch: MiddlewareDispatch) => {
  return await dispatch(fetchFollowDescriptionAction(id, Token.create(ctx)));
};

export const getProfitChart: TGetChartFunc = ({
  id,
  period,
  currencies
}) => async dispatch =>
  await dispatch(fetchFollowProfitChartAction(id, period, currencies));

export const getAbsoluteProfitChart: TGetChartFunc = ({
  id,
  period,
  currencies
}) => async dispatch =>
  await dispatch(
    fetchFollowAbsoluteProfitChartAction(id, period, currencies[0])
  );

export const getBalanceChart: TGetChartFunc = ({
  id,
  period,
  currencies
}) => async dispatch => {
  await dispatch(fetchFollowBalanceChartAction(id, period, currencies[0]));
};
