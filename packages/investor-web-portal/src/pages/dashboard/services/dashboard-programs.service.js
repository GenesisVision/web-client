import { investorApiProxy } from "shared/services/api-client/investor-api";
import authService from "shared/services/auth-service";

export const getDashboardPrograms = filters => {
  return investorApiProxy.v10InvestorProgramsGet(
    authService.getAuthArg(),
    filters
  );
};
