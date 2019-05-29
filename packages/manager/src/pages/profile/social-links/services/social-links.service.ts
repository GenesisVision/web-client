import { CancelablePromise, SocialLinksViewModel } from "gv-api-web";
import profileApi from "shared/services/api-client/profile-api";
import authService from "shared/services/auth-service";

export const fetchSocialLinks = (): CancelablePromise<SocialLinksViewModel> => {
  const authorization = authService.getAuthArg();
  return profileApi.v10ProfileSociallinksGet(authorization);
};

export const updateSocialLink = (id: string, value: string) => {
  const requestData = {};
  const authorization = authService.getAuthArg();
  return profileApi.v10ProfileSociallinksUpdatePost(authorization, requestData);
};
