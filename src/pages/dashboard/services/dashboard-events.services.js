import { investorApiProxy } from "services/api-client/investor-api";
import authService from "services/auth-service";

export const fetchPortfolioEvents = filters => {
  const authorization = authService.getAuthArg() + 1;

  return investorApiProxy
    .v10InvestorPortfolioEventsGet(authorization, filters)
    .then(data => ({
      items: data.events,
      total: data.total
    }));
};
