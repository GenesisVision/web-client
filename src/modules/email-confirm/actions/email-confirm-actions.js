import * as actionTypes from "./email-confirm-actions.constants";

import SwaggerInvestorApi from "../../../services/api-client/swagger-investor-api";

const emailConfirm = (userId, code) => {
  return {
    type: actionTypes.EMAIL_CONFIRM,
    payload: SwaggerInvestorApi.apiInvestorAuthConfirmEmailGet({ userId, code })
  };
};

const emailConfirmActions = { emailConfirm };

export default emailConfirmActions;
