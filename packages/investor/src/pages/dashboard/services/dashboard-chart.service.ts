import { NextPageContext } from "next";
import { RootState } from "shared/reducers/root-reducer";
import authService from "shared/services/auth-service";
import { AuthRootState, MiddlewareDispatch } from "shared/utils/types";

import * as actions from "../actions/dashboard.actions";
import { dashboardPortfolioChartPeriodSelector } from "../reducers/dashboard-portfolio-chart.reducer";

export const getPortfolioChart = async (ctx?: NextPageContext) => async (
  dispatch: MiddlewareDispatch,
  getState: () => AuthRootState
): Promise<void> => {
  const authorization = authService.getAuthArg(ctx);
  const period = dashboardPortfolioChartPeriodSelector(getState());
  const { currency } = getState().accountSettings;

  const filters = {
    currency,
    from: period.start,
    to: period.end,
    balancePoints: 30,
    programsPoints: 7
  };

  await dispatch(actions.fetchPortfolioChartAction(authorization, filters));
};
