import { investorApiProxy } from "services/api-client/investor-api";
import authService from "services/auth-service";

export const getDashboardPrograms = filters => {
  return investorApiProxy.v10InvestorProgramsGet(
    authService.getAuthArg(),
    filters
  );
};
