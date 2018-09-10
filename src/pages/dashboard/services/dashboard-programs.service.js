import investorApi from "services/api-client/investor-api";
import authService from "services/auth-service";

export const getDashboardPrograms = filters => {
  return investorApi.v10InvestorProgramsGet(authService.getAuthArg(), filters);
};
