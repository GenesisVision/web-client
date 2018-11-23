import { PROFILE_HEADER } from "shared/components/header/header.constants";
import profileApi from "shared/services/api-client/profile-api";
import authService from "shared/services/auth-service";

export const getProfileHeaderInfo = () => ({
  type: PROFILE_HEADER,
  payload: profileApi.v10ProfileHeaderGet(authService.getAuthArg())
});
