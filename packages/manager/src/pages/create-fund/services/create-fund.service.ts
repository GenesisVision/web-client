import managerApi from "shared/services/api-client/manager-api";
import authService from "shared/services/auth-service";

export const fetchMinimumDepositAmount = () =>
  managerApi.v10ManagerFundsInvestmentAmountGet(authService.getAuthArg());
