import { SocialLinkViewModel, UpdateSocialLinkViewModel } from "gv-api-web";
import profileApi from "services/api-client/profile-api";
import authService from "services/auth-service";

export const fetchSocialLinks = (): Promise<SocialLinkViewModel[]> => {
  const authorization = authService.getAuthArg();
  return profileApi
    .getSocialLinks(authorization)
    .then(({ socialLinks }) => socialLinks);
};

export const updateSocialLink = (body: UpdateSocialLinkViewModel) =>
  profileApi.updateSocialLinks(authService.getAuthArg(), {
    body
  });
