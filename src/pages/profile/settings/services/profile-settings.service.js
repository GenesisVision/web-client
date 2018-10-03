import { fetchProfileHeaderInfo } from "modules/header/actions/header-actions";
import { profileApiProxy } from "services/api-client/profile-api";
import authService from "services/auth-service";
import filesService from "shared/services/file-service";

export const setNewProfileAvatar = croppedImage => dispatch => {
  const authorization = authService.getAuthArg();

  filesService
    .uploadFileProxy(croppedImage, authorization)
    .then(logoId =>
      profileApiProxy.v10ProfileUpdateAvatarByFileIdPost(logoId, authorization)
    )
    .then(() => dispatch(fetchProfileHeaderInfo()))
    .catch(error => alert(error.errorMessage || error.message));
};
