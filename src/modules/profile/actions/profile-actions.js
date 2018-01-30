import SwaggerInvestorApi from "../../../services/api-client/swagger-investor-api";
import withAuthorization from "../../../shared/utils/wrappers/with-authorization";

import * as actionTypes from "./profile-actions.constants";

const fetchProfile = () => {
  return {
    type: actionTypes.PROFILE,
    payload: withAuthorization(
      SwaggerInvestorApi.apiInvestorProfileFullGet.bind(SwaggerInvestorApi)
    )
  };
};

const profileActions = { fetchProfile };
export default profileActions;
