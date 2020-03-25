import { Currency } from "gv-api-web";
import assetsApi from "services/api-client/assets-api";
import platformApi from "services/api-client/platform-api";
import { api, Token } from "services/api-client/swagger-custom-client";
import authService from "services/auth-service";

export const getProgramLevelsInfo = (id: string, signal?: AbortSignal) => {
  return api.assets(Token.create()).getLevelsCalculator(id, {}, { signal });
};

export const getPlatformLevels = (
  currency?: Currency,
  signal?: AbortSignal
) => {
  return platformApi.getProgramLevels({ currency }, { signal });
};
