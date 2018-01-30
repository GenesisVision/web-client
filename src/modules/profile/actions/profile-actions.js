import authService from "../../../services/authService";
import SwaggerInvestorApi from "../../../services/api-client/swagger-investor-api";

import * as actionTypes from "./profile-actions.constants";

const fetchProfile = () => {
  return {
    type: actionTypes.PROFILE,
    payload: SwaggerInvestorApi.apiInvestorProfileFullGet(
      authService.getAuthArg()
    )
  };
};

const profileActions = { fetchProfile };
export default profileActions;
