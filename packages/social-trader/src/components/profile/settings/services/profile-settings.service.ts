import authActions from "actions/auth-actions";
import { IImageValue } from "components/form/input-image/input-image";
import { Dispatch } from "redux";
import authApi from "services/api-client/auth-api";
import profileApi from "services/api-client/profile-api";
import { api, Token } from "services/api-client/swagger-custom-client";
import authService from "services/auth-service";
import filesService from "services/file-service";

export const updateProfileAvatar = ({
  newImage
}: {
  newImage: IImageValue;
}) => {
  const token = Token.create();
  let promise;
  if (!newImage.src && !newImage.image) {
    promise = api.profile(token).removeAvatar();
  } else {
    promise = filesService.uploadFile(newImage.image!.cropped).then(logoId => {
      return api.profile(token).updateAvatar(logoId);
    });
  }

  return promise;
};

export const logoutFromDevices = (dispatch: Dispatch) =>
  api
    .auth(Token.create())
    .logoutFromAnotherDevices()
    .then(response => {
      authService.storeToken(response);
      dispatch(authActions.updateTokenAction(true));
    });
