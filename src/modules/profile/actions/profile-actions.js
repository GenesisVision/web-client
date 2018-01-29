import { ProfileFullViewModel } from "gv-api-web";

import SwaggerInvestorApi from "../../../services/api-client/swagger-investor-api";

import * as actionTypes from "./profile-actions.constants";
import authService from "../../../services/authService";

const withAuthorization = (promise, ...args) => {
  const authorization = `Bearer ${authService.getToken()}`;
  return promise(authorization, ...args);
};

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
