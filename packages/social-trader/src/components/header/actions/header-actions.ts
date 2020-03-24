import { PROFILE_HEADER } from "components/header/header.constants";
import { ProfileHeaderViewModel } from "gv-api-web";
import { api } from "services/api-client/swagger-custom-client";
import { ApiAction } from "utils/types";

export const fetchProfileHeaderInfoAction = (): ApiAction<ProfileHeaderViewModel> => {
  return {
    type: PROFILE_HEADER,
    payload: api.profile().getProfileHeader()
  };
};
