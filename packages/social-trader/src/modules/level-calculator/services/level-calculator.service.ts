import { Currency } from "gv-api-web";
import assetsApi from "services/api-client/assets-api";
import platformApi from "services/api-client/platform-api";
import authService from "shared/services/auth-service";

export const getProgramLevelsInfo = (id: string) => {
  const authorization = authService.getAuthArg();
  return assetsApi.getLevelsCalculator(id, authorization);
};

export const getPlatformLevels = (currency?: Currency) => {
  return platformApi.getProgramLevels({ currency });
};
