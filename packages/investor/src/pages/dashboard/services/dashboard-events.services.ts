import { Dispatch } from "redux";
import authService from "shared/services/auth-service";

import * as actions from "../actions/dashboard.actions";

export const getTopPortfolioEvents = () => (dispatch: Dispatch) => {
  const authorization = authService.getAuthArg();

  dispatch(actions.fetchPortfolioEvents(authorization, { take: 5 }));
};
