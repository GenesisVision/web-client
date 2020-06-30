import { SocialSummary } from "gv-api-web";
import { api } from "services/api-client/swagger-custom-client";
import Token from "services/api-client/token";

export const getSocialPageData = (token?: Token): Promise<SocialSummary> => {
  return api.social(token).getSocialSummary();
};
