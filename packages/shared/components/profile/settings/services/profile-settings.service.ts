import { Dispatch } from "redux";
import authActions from "shared/actions/auth-actions";
import { IImageValue } from "shared/components/form/input-image/input-image";
import authApi from "shared/services/api-client/auth-api";
import profileApi from "shared/services/api-client/profile-api";
import authService from "shared/services/auth-service";
import filesService from "shared/services/file-service";

export const updateProfileAvatar = ({
  newImage
}: {
  newImage: IImageValue;
}) => {
  const authorization = authService.getAuthArg();
  let promise;
  if (!newImage.src && !newImage.image) {
    promise = profileApi.removeAvatar(authorization);
  } else {
    promise = filesService
      .uploadFile(newImage.image!.cropped, authorization)
      .then(logoId => {
        return profileApi.updateAvatar(logoId, authorization);
      });
  }

  return promise;
};

export const logoutFromDevices = (dispatch: Dispatch) =>
  authApi.logoutFromAnotherDevices(authService.getAuthArg()).then(response => {
    authService.storeToken(response);
    dispatch(authActions.updateTokenAction(true));
  });
