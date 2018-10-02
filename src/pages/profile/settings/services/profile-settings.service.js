import { profileApiProxy } from "services/api-client/profile-api";
import authService from "services/auth-service";
import filesService from "shared/services/file-service";

export const setNewProfileAvatar = imageBlob => {
  const authorization = authService.getAuthArg();

  // filesService
  //   .uploadFileProxy(imageBlob, authorization)
  //   .then(logoId => profileApiProxy.updateAvatar(logoId, authorization));
};
