import { Currency } from "gv-api-web";
import assetsApi from "services/api-client/assets-api";
import platformApi from "services/api-client/platform-api";
import authService from "services/auth-service";

export const getProgramLevelsInfo = (id: string, signal?: AbortSignal) => {
  const authorization = authService.getAuthArg();
  return assetsApi.getLevelsCalculator(id, authorization, {}, { signal });
};

export const getPlatformLevels = (
  currency?: Currency,
  signal?: AbortSignal
) => {
  return platformApi.getProgramLevels({ currency }, { signal });
};
