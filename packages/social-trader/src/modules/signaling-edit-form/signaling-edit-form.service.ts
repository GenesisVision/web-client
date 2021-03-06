import { CreateSignalProvider } from "gv-api-web";
import { api } from "services/api-client/swagger-custom-client";

export const editSignal = (body: CreateSignalProvider) => {
  return api.assets().updateSignalProviderSettings({
    body
  });
};
