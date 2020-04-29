import { Currency } from "gv-api-web";
import { api } from "services/api-client/swagger-custom-client";

export const getProgramLevelsInfo = (id: string, signal?: AbortSignal) => {
  return api.assets().getLevelsCalculator(id, {}, { signal });
};

export const getPlatformLevels = (
  currency?: Currency,
  signal?: AbortSignal
) => {
  return api.platform().getProgramLevels({ currency }, { signal });
};
