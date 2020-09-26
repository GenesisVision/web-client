import { MakeSelfManagedFundPublicRequest } from "gv-api-web";
import { api } from "services/api-client/swagger-custom-client";

export const makeFundPublic = (body: MakeSelfManagedFundPublicRequest) => {
  return api.assets().makeSelfManagedFundPublic({
    body
  });
};
