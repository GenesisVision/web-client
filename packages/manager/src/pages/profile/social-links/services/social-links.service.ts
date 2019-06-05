import {
  CancelablePromise,
  SocialLinksViewModel,
  UpdateSocialLinkViewModel
} from "gv-api-web";
import { Dispatch } from "redux";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import profileApi from "shared/services/api-client/profile-api";
import authService from "shared/services/auth-service";
import { ResponseError } from "shared/utils/types";

export const fetchSocialLinks = (): CancelablePromise<SocialLinksViewModel> => {
  const authorization = authService.getAuthArg();
  return profileApi.v10ProfileSociallinksGet(authorization);
};

export const updateSocialLink = (requestData: UpdateSocialLinkViewModel) => (
  dispatch: Dispatch
) => {
  const requestData = {};
  const authorization = authService.getAuthArg();
  return profileApi
    .v10ProfileSociallinksUpdatePost(authorization, requestData)
    .then(() => {
      dispatch(
        alertMessageActions.success(
          "profile-page.social-links.notifications.edit-success",
          true
        )
      );
    })
    .catch((error: ResponseError) => {
      dispatch(alertMessageActions.error(error.errorMessage));
    });
};
