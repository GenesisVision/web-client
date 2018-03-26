import authService from "../../../services/auth-service";
import filesService from "../../../shared/services/file-service";
import SwaggerInvestorApi from "../../../services/api-client/swagger-investor-api";

import * as actionTypes from "./trader-deposit-actions.constants";

const fetchTraderDeposit = traderId => {
  return {
    type: actionTypes.TRADER_DEPOSIT,
    payload: SwaggerInvestorApi.apiInvestorInvestmentProgramBuyTokensGet(
      traderId,
      authService.getAuthArg()
    ).then(response => {
      const trader = response;
      trader.logo = filesService.getFileUrl(trader.logo);
      return response;
    })
  };
};

const submitTraderDeposit = (traderId, amount) => {
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

const traderDepositActions = {
  fetchTraderDeposit,
  submitTraderDeposit
};
export default traderDepositActions;
