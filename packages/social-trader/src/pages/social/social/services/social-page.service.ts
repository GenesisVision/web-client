import { SocialSummary, UserFeedMode } from "gv-api-web";
import { api } from "services/api-client/swagger-custom-client";

export const getSocialPageData = (): Promise<SocialSummary> => {
  return api.social().getSocialSummary();
};
