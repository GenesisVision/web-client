import SwaggerManagerApi from "../../../services/api-client/swagger-manager-api";
import authService from "../../../services/auth-service";
import * as actionTypes from "./program-deposit-actions.constants";

const fetchProgramDeposit = (programId, onResolve = data => data) => ({
  type: actionTypes.PROGRAM_DEPOSIT,
  payload: SwaggerManagerApi.apiManagerInvestmentProgramBuyTokensGet(
    programId,
    authService.getAuthArg()
  ).then(onResolve)
});

const submitProgramDeposit = (programId, amount) => {
  const model = {
    investmentProgramId: programId,
    amount
  };
  return {
    type: actionTypes.PROGRAM_DEPOSIT_SUBMIT,
    payload: SwaggerManagerApi.apiManagerInvestmentInvestPost(
      authService.getAuthArg(),
      { model }
    )
  };
};

const programDepositActions = {
  fetchProgramDeposit,
  submitProgramDeposit
};
export default programDepositActions;
