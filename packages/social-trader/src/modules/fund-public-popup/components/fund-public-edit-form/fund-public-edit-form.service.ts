import { api } from "services/api-client/swagger-custom-client";

export const makeFundPublic = (body: any) => {
  return api.assets().updateSignalProviderSettings({
    body
  });
};
