import { fetchProfileHeaderInfo } from "modules/header/actions/header-actions";
import { profileApiProxy } from "services/api-client/profile-api";
import authService from "services/auth-service";
import filesService from "shared/services/file-service";

export const updateProfileAvatar = (
  croppedImage,
  submitCallback
) => dispatch => {
  const authorization = authService.getAuthArg();
  let photoSrc = null;

  filesService
    .uploadFileProxy(croppedImage, authorization)
    .then(logoId => {
      photoSrc = filesService.getFileUrl(logoId);
      return profileApiProxy.v10ProfileAvatarUpdateByFileIdPost(
        logoId,
        authorization
      );
    })
    .then(() => dispatch(fetchProfileHeaderInfo()))
    .then(() => submitCallback(photoSrc))
    .catch(error => alert(error.errorMessage || error.message));
};

export const removeProfileAvatar = submitCallback => dispatch => {
  const authorization = authService.getAuthArg();

  profileApiProxy
    .v10ProfileAvatarRemovePost(authorization)
    .then(() => dispatch(fetchProfileHeaderInfo()))
    .then(() => submitCallback())
    .catch(error => alert(error.errorMessage || error.message));
};
