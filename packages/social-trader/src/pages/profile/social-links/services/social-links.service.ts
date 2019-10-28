import {
  CancelablePromise,
  SocialLinkViewModel,
  UpdateSocialLinkViewModel
} from "gv-api-web";
import { Dispatch } from "redux";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import profileApi from "shared/services/api-client/profile-api";
import authService from "shared/services/auth-service";

export const fetchSocialLinks = (): CancelablePromise<
  SocialLinkViewModel[]
> => {
  const authorization = authService.getAuthArg();
  return profileApi
    .getSocialLinks(authorization)
    .then(({ socialLinks }) => socialLinks);
};

export const updateSocialLink = (requestData: UpdateSocialLinkViewModel) => (
  dispatch: Dispatch
) => {
  const authorization = authService.getAuthArg();
  return profileApi
    .updateSocialLinks(authorization, { model: requestData })
    .then(() => {
      dispatch(
        alertMessageActions.success(
          "profile-page.social-links.notifications.edit-success",
          true
        )
      );
    });
};
