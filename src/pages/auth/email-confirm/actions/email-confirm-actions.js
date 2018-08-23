import SwaggerInvestorApi from "services/api-client/swagger-investor-api";

import * as actionTypes from "./email-confirm-actions.constants";

const emailConfirm = (userId, code) => {
  return {
    type: actionTypes.EMAIL_CONFIRM,
    payload: SwaggerInvestorApi.apiInvestorAuthConfirmEmailPost({
      userId,
      code
    })
  };
};

const emailConfirmActions = { emailConfirm };

export default emailConfirmActions;
