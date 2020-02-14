import { PROFILE_HEADER } from "components/header/header.constants";
import { ProfileHeaderViewModel } from "gv-api-web";
import profileApi from "services/api-client/profile-api";
import authService from "services/auth-service";
import { ApiAction } from "utils/types";

export const fetchProfileHeaderInfoAction = (): ApiAction<ProfileHeaderViewModel> => ({
  type: PROFILE_HEADER,
  payload: profileApi.getProfileHeader(authService.getAuthArg())
});
