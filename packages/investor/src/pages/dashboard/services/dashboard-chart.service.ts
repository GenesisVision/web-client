import { Dispatch } from "redux";
import authService from "shared/services/auth-service";
import { CurrencyEnum } from "shared/utils/types";

import * as actions from "../actions/dashboard.actions";

export const getPortfolioChart = (
  from?: Date,
  to?: Date,
  currency?: CurrencyEnum
) => (dispatch: Dispatch) => {
  const authorization = authService.getAuthArg();

  const filters = {
    currency,
    from,
    to,
    balancePoints: 30,
    programsPoints: 7
  };

  dispatch(actions.fetchPortfolioChartAction(authorization, filters));
};
