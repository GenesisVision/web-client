import { investorApiProxy } from "services/api-client/investor-api";
import authService from "services/auth-service";

export const getDashboardFunds = filters => {
  return investorApiProxy.v10InvestorFundsGet(
    authService.getAuthArg(),
    filters
  );
};
