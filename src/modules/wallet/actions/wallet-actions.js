import authService from "../../../services/auth-service";
import SwaggerInvestorApi from "../../../services/api-client/swagger-investor-api";
import * as actionTypes from "./wallet-actions.constants";

const fetchWallet = () => {
  return {
    type: actionTypes.WALLET,
    payload: SwaggerInvestorApi.apiInvestorWalletGet(authService.getAuthArg())
  };
};

const fetchWalletAddress = () => {
  return {
    type: actionTypes.WALLET_ADDRESS,
    payload: SwaggerInvestorApi.apiInvestorWalletAddressGet(
      authService.getAuthArg()
    )
  };
};

const fetchWalletTransactionProgramFilter = () => {
  return {
    type: actionTypes.WALLET_FILER_PANE_PROGRAMS,
    payload: SwaggerInvestorApi.apiInvestorWalletTransactionsInvestmentProgramsListGet(
      authService.getAuthArg()
    )
  };
};

const walletWithdraw = withdrawData => {
  const data = {
    request: withdrawData
  };
  return {
    type: actionTypes.WALLET_WITHDRAW,
    payload: SwaggerInvestorApi.apiInvestorWalletWithdrawRequestPost(
      authService.getAuthArg(),
      data
    )
  };
};

const walletActions = {
  fetchWallet,
  fetchWalletAddress,
  walletWithdraw,
  fetchWalletTransactionProgramFilter
};
export default walletActions;
