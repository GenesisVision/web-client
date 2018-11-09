import { investorApiProxy } from "shared/services/api-client/investor-api";
import authService from "shared/services/auth-service";

export const getDashboardFunds = filters => {
  return investorApiProxy.v10InvestorFundsGet(
    authService.getAuthArg(),
    filters
  );
};
