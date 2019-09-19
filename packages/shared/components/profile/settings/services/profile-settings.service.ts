import { Dispatch } from "redux";
import authActions from "shared/actions/auth-actions";
import { IImageValue } from "shared/components/form/input-image/input-image";
import { fetchProfileHeaderInfoAction } from "shared/components/header/actions/header-actions";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import authApi from "shared/services/api-client/auth-api";
import profileApi from "shared/services/api-client/profile-api";
import authService from "shared/services/auth-service";
import filesService from "shared/services/file-service";
import { ResponseError } from "shared/utils/types";

export const updateProfileAvatar = (newImage: IImageValue) => (
  dispatch: Dispatch
) => {
  const authorization = authService.getAuthArg();
  let promise;
  if (!newImage.src && !newImage.image) {
    promise = profileApi.v10ProfileAvatarRemovePost(authorization);
  } else {
    promise = filesService
      .uploadFile(newImage.image!.cropped, authorization)
      .then(logoId => {
        return profileApi.v10ProfileAvatarUpdateByFileIdPost(
          logoId,
          authorization
        );
      });
  }

  return promise
    .then(() => {
      dispatch(fetchProfileHeaderInfoAction());
      dispatch(
        alertMessageActions.success(
          "profile-page.settings.image-success-save-message",
          true
        )
      );
    })
    .catch((error: ResponseError) => {
      dispatch(alertMessageActions.error(error.errorMessage));
    });
};

export const logoutFromDevices = (dispatch: Dispatch) =>
  authApi
    .v10AuthTokenDevicesLogoutPost(authService.getAuthArg())
    .then(response => {
      authService.storeToken(response);
      dispatch(authActions.updateTokenAction(true));
      dispatch(
        alertMessageActions.success(
          "auth.logout-from-another-devices.success-message",
          true
        )
      );
      return response;
    })
    .catch(error => {
      dispatch(alertMessageActions.error(error.errorMessage));
      throw error;
    });
