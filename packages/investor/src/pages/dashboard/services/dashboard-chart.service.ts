import { Dispatch } from "redux";
import authService from "shared/services/auth-service";
import { TGetState } from "shared/utils/types";

import * as actions from "../actions/dashboard.actions";

export const getPortfolioChart = (from: Date, to: Date) => (
  dispatch: Dispatch,
  getState: TGetState
) => {
  const authorization = authService.getAuthArg();
  const { currency } = getState().accountSettings;

  const filters = {
    currency,
    from,
    to,
    balancePoints: 30,
    programsPoints: 7
  };

  dispatch(actions.fetchPortfolioChart(authorization, filters));
};
