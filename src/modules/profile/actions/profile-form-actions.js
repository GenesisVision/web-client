import { ProfileFullViewModel } from "gv-api-web";

import history from "../../../utils/history";
import SwaggerInvestorApi from "../../../services/api-client/swagger-investor-api";
import withAuthorization from "../../../shared/utils/wrappers/with-authorization";

import { PROFILE_FORM } from "./profile-actions.constants";
import { PROFILE_ROUTE } from "../profile.constants";
import profileActions from "./profile-actions";

const updateProfile = profileFormData => {
  const opts = {
    model: ProfileFullViewModel.constructFromObject(profileFormData)
  };
  return {
    type: PROFILE_FORM,
    payload: withAuthorization(
      SwaggerInvestorApi.apiInvestorProfileUpdatePost.bind(SwaggerInvestorApi),
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
