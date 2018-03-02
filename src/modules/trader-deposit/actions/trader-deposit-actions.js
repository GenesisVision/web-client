import authService from "../../../services/authService";
import history from "../../../utils/history";
import SwaggerInvestorApi from "../../../services/api-client/swagger-investor-api";

import * as actionTypes from "./trader-deposit-actions.constants";

const fetchTraderDeposit = traderId => {
  return {
    type: actionTypes.TRADER_DEPOSIT,
    payload: Promise.resolve({
      id: "1",
      name: "Program A",
      rate: 22,
      available: 100
    })
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
