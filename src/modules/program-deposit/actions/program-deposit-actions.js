import authService from "../../../services/auth-service";
import filesService from "../../../shared/services/file-service";
import SwaggerInvestorApi from "../../../services/api-client/swagger-investor-api";

import * as actionTypes from "./program-deposit-actions.constants";

const fetchProgramDeposit = programId => {
  return {
    type: actionTypes.PROGRAM_DEPOSIT,
    payload: SwaggerInvestorApi.apiInvestorInvestmentProgramBuyTokensGet(
      programId,
      authService.getAuthArg()
    ).then(response => {
      const program = response;
      program.logo = filesService.getFileUrl(program.logo);
      return response;
    })
  };
};

const submitProgramDeposit = (programId, amount) => {
  const model = {
    investmentProgramId: programId,
    amount
  };
  return {
    type: actionTypes.PROGRAM_DEPOSIT_SUBMIT,
    payload: SwaggerInvestorApi.apiInvestorInvestmentProgramsInvestPost(
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
