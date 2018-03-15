import authService from "../../../services/authService";
import history from "../../../utils/history";
import SwaggerInvestorApi from "../../../services/api-client/swagger-investor-api";

import * as actionTypes from "./trader-deposit-actions.constants";

const fetchTraderDeposit = traderId => {
  //8b9128ea-6f8c-4741-8043-585cf34e6a17
  return {
    type: actionTypes.TRADER_DEPOSIT,
    payload: SwaggerInvestorApi.apiInvestorInvestmentProgramBuyTokensGet(
      "8b9128ea-6f8c-4741-8043-585cf34e6a17",
      authService.getAuthArg()
    )
  };
};

const submitTraderDeposit = (traderId, amount, onCatch) => {
  const model = {
    investmentProgramId: traderId,
    amount
  };
  return {
    type: actionTypes.TRADER_DEPOSIT_SUBMIT,
    payload: SwaggerInvestorApi.apiInvestorInvestmentProgramsInvestPost(
      authService.getAuthArg(),
      { model }
    )
  };
};

const closeTraderDepositModal = from => {
  history.push(from);
};

const traderDepositActions = {
  fetchTraderDeposit,
  closeTraderDepositModal,
  submitTraderDeposit
};
export default traderDepositActions;
