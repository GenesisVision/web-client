import SwaggerManagerApi from "shared/services/api-client/swagger-manager-api";
import authService from "shared/services/auth-service";

import * as actionTypes from "./fund-withdraw-actions.constants";

const submitProgramWithdraw = (fundId, percent) => {
  const model = {
    investmentProgramId: fundId,
    percent
  };
  return {
    type: actionTypes.PROGRAM_WITHDRAW_SUBMIT,
    payload: SwaggerManagerApi.apiManagerInvestmentWithdrawPost(
      authService.getAuthArg(),
      { model }
    )
  };
};

const fundWithdrawActions = {
  submitProgramWithdraw: submitProgramWithdraw
};
export default fundWithdrawActions;
