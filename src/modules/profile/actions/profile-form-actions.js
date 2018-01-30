import { ProfileFullViewModel } from "gv-api-web";

import authService from "../../../services/authService";
import history from "../../../utils/history";
import SwaggerInvestorApi from "../../../services/api-client/swagger-investor-api";

import { PROFILE_FORM } from "./profile-actions.constants";
import { PROFILE_ROUTE } from "../profile.constants";

const updateProfile = profileFormData => {
  const opts = {
    model: ProfileFullViewModel.constructFromObject(profileFormData)
  };
  return {
    type: PROFILE_FORM,
    payload: SwaggerInvestorApi.apiInvestorProfileUpdatePost(
      authService.getAuthArg(),
      opts
    ).then(response => {
      history.push(PROFILE_ROUTE);
      return response;
    })
  };
};

const cancelChanges = () => {
  history.push(PROFILE_ROUTE);
};

const profileFormActions = { updateProfile, cancelChanges };
export default profileFormActions;
