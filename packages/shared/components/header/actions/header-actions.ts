import { CancelablePromise, ProfileHeaderViewModel } from "gv-api-web";
import { PROFILE_HEADER } from "shared/components/header/header.constants";
import profileApi from "shared/services/api-client/profile-api";
import authService from "shared/services/auth-service";
import { ActionType, ApiAction } from "shared/utils/types";

export const fetchProfileHeaderInfoAction = (): ApiAction<
  ProfileHeaderViewModel
> => ({
  type: PROFILE_HEADER,
  payload: profileApi.v10ProfileHeaderGet(authService.getAuthArg())
});
