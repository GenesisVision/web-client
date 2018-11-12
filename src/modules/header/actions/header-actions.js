import { PROFILE_HEADER } from "modules/header/header.constants";
import profileApi from "services/api-client/profile-api";
import authService from "services/auth-service";

export const fetchProfileHeaderInfo = () => ({
  type: PROFILE_HEADER,
  payload: profileApi.v10ProfileHeaderGet(authService.getAuthArg())
});
