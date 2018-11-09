import { investorApiProxy } from "shared/services/api-client/investor-api";
import authService from "shared/services/auth-service";

export const fetchPortfolioEvents = filters => {
  const authorization = authService.getAuthArg();

  return investorApiProxy
    .v10InvestorPortfolioEventsGet(authorization, filters)
    .then(({ data }) => ({
      items: data.events,
      total: data.total
    }));
};
