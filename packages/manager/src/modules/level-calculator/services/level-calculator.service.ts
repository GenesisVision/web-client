import managerApi from "shared/services/api-client/manager-api";
import platformApi from "shared/services/api-client/platform-api";
import authService from "shared/services/auth-service";

export const getProgramLevelsInfo = (id: string) => {
  const authorization = authService.getAuthArg();
  return managerApi.getLevelsCalculator(id, authorization);
};

export const getPlatformLevels = (currency: string) => {
  return platformApi.getProgramsLevels({ currency });
};
