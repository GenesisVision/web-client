import managerApi from "shared/services/api-client/manager-api";
import authService from "shared/services/auth-service";

export const changeBrokerMethod = (
  programId: string,
  newBrokerAccountTypeId: string,
  newLeverage: number
) =>
  managerApi.v10ManagerProgramsBrokerChangePost(authService.getAuthArg(), {
    request: { programId, newBrokerAccountTypeId, newLeverage }
  });
