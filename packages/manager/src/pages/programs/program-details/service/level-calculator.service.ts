import managerApi from "shared/services/api-client/manager-api";
import platformApi from "shared/services/api-client/platform-api";
import authService from "shared/services/auth-service";

export const getProgramLevelsInfo = (id: string) => {
  const authorization = authService.getAuthArg();
  return managerApi.v10ManagerProgramsByIdLevelsInfoGet(id, authorization);
};

export const getPlatformLevels = (currency: string) => {
  return platformApi.v10PlatformLevelsGet({ currency });
};

export const getPlatformLevelsParams = (currency: string) => {
  return platformApi.v10PlatformLevelsParametersGet({ currency });
};
