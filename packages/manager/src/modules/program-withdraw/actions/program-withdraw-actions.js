import authService from "../../../services/auth-service";
import SwaggerManagerApi from "../../../services/api-client/swagger-manager-api";

import * as actionTypes from "./program-withdraw-actions.constants";

const submitProgramWithdraw = (programId, amount) => {
  const model = {
    investmentProgramId: programId,
    amount
  };
  return {
    type: actionTypes.PROGRAM_WITHDRAW_SUBMIT,
    payload: SwaggerManagerApi.apiManagerInvestmentWithdrawPost(
      authService.getAuthArg(),
      { model }
    )
  };
};

const programWithdrawActions = {
  submitProgramWithdraw: submitProgramWithdraw
};
export default programWithdrawActions;
