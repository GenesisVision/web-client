import authService from "../../../services/auth-service";
import SwaggerInvestorApi from "../../../services/api-client/swagger-investor-api";

import * as actionTypes from "./program-withdraw-actions.constants";

const submitProgramWithdraw = (traderId, amount) => {
  const model = {
    investmentProgramId: traderId,
    amount
  };
  return {
    type: actionTypes.PROGRAM_WITHDRAW_SUBMIT,
    payload: SwaggerInvestorApi.apiInvestorInvestmentProgramsWithdrawPost(
      authService.getAuthArg(),
      { model }
    )
  };
};

const traderWithdrawActions = {
  submitProgramWithdraw
};
export default traderWithdrawActions;
