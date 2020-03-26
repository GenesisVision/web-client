import { SocialLinkViewModel, UpdateSocialLinkViewModel } from "gv-api-web";
import { api, Token } from "services/api-client/swagger-custom-client";

export const fetchSocialLinks = (): Promise<SocialLinkViewModel[]> => {
  return api
    .profile()
    .getSocialLinks()
    .then(({ socialLinks }) => socialLinks);
};

export const updateSocialLink = (body: UpdateSocialLinkViewModel) =>
  api.profile().updateSocialLinks({
    body
  });
