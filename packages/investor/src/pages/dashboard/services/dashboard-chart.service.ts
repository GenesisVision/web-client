import { NextPageContext } from "next";
import { Dispatch } from "redux";
import { ChartDefaultPeriod } from "shared/components/chart/chart-period/chart-period.helpers";
import authService from "shared/services/auth-service";
import { AuthRootState, MiddlewareDispatch } from "shared/utils/types";

import * as actions from "../actions/dashboard.actions";
import { dashboardPortfolioChartPeriodSelector } from "../reducers/dashboard-portfolio-chart.reducer";

export const getPortfolioChart = (ctx?: NextPageContext) => async (
  dispatch: MiddlewareDispatch,
  getState: () => AuthRootState
): Promise<void> => {
  const authorization = authService.getAuthArg(ctx);
  const period = dashboardPortfolioChartPeriodSelector(getState());

  const { currency } = getState().accountSettings;
  const filters = {
    currency,
    from: period.start ? new Date(period.start) : undefined,
    to: period.end ? period.end.toISOString() : undefined,
    balancePoints: 30,
    programsPoints: 7
  };

  await dispatch(actions.fetchPortfolioChartAction(authorization, filters));
};

export const changePeriod = (period: ChartDefaultPeriod) => (
  dispatch: Dispatch
) => {
  dispatch(actions.changeChartPeriodAction(period));
};
