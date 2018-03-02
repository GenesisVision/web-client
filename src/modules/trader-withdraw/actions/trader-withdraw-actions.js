import authService from "../../../services/authService";
import history from "../../../utils/history";
import SwaggerInvestorApi from "../../../services/api-client/swagger-investor-api";

import * as actionTypes from "./trader-withdraw-actions.constants";

const fetchTraderWithdraw = traderId => {
  return {
    type: actionTypes.TRADER_WITHDRAW,
    payload: Promise.resolve({
      id: "1",
      name: "Program A",
      rate: 0.22,
      available: 100
    })
  };
};

const submitTraderWithdraw = (traderId, amount) => {
  const model = {
    investmentProgramId: traderId,
    amount
  };
  return {
    type: actionTypes.TRADER_WITHDRAW_SUBMIT,
    payload: SwaggerInvestorApi.apiInvestorInvestmentProgramsWithdrawPost(
      authService.getAuthArg(),
      { model }
    )
  };
};

const closeTraderWithdrawModal = from => {
  history.push(from);
};

const traderWithdrawActions = {
  fetchTraderWithdraw,
  closeTraderWithdrawModal,
  submitTraderWithdraw
};
export default traderWithdrawActions;
