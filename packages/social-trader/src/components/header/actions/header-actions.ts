import { PROFILE_HEADER } from "components/header/header.constants";
import { getHeader } from "components/header/services/header.service";
import { ProfileHeaderViewModel } from "gv-api-web";
import { ApiAction } from "utils/types";

export const ProfileHeaderInfoAction: ApiAction<ProfileHeaderViewModel> = {
  type: PROFILE_HEADER,
  payload: getHeader()
};
