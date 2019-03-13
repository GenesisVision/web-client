import { DashboardPortfolioEvent } from "gv-api-web";
import { Dispatch } from "redux";
import { mapToTableItems } from "shared/components/table/helpers/mapper";
import investorApi from "shared/services/api-client/investor-api";
import authService from "shared/services/auth-service";

import * as actions from "../actions/dashboard.actions";

export const fetchPortfolioEvents = (filters: any) => {
  const authorization = authService.getAuthArg();

  return investorApi
    .v10InvestorPortfolioEventsGet(authorization, filters)
    .then(mapToTableItems<DashboardPortfolioEvent>("events"));
};

export const getTopPortfolioEvents = () => (dispatch: Dispatch) => {
  const authorization = authService.getAuthArg();

  dispatch(actions.fetchPortfolioEvents(authorization, { take: 5 }));
};
