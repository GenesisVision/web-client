import { CreateSignalProvider } from "gv-api-web";
import { api } from "services/api-client/swagger-custom-client";

export const makeFundPublic = (body: any) => {
  return api.assets().updateSignalProviderSettings({
    body
  });
};
