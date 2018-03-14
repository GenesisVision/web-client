import authService from "../../../services/authService";
import history from "../../../utils/history";
import SwaggerInvestorApi from "../../../services/api-client/swagger-investor-api";

import { WALLET_ROUTE } from "../wallet.constants";
import * as actionTypes from "./wallet-actions.constants";

/*
Promise.all([
  Promise.resolve({ amount: 100, rate: 22 }),
  Promise.resolve("0x0000000000000000000000000000000000000gv")
]) */
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

const fetchWalletTransactions = filter => {
  const data = {
    filter: {
      type: filter
    }
  };
  return {
    type: actionTypes.WALLET_TRANSACTIONS,
    payload: SwaggerInvestorApi.apiInvestorWalletTransactionsPost(
      authService.getAuthArg(),
      data
    )
  };
};

const fetchWalletTransactionProgramFilter = () => {
  return {
    type: actionTypes.WALLET_TRANSACTION_PROGRAM_FILTER,
    payload: SwaggerInvestorApi.apiInvestorWalletTransactionsInvestmentProgramsListGet(
      authService.getAuthArg()
    )
  };
};

const fetchWalletChart = () => {
  return {
    type: actionTypes.WALLET_CHART,
    payload: SwaggerInvestorApi.apiInvestorWalletStatisticPost(
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

const openWallet = () => {
  history.push(WALLET_ROUTE);
};

const walletActions = {
  fetchWallet,
  fetchWalletTransactions,
  fetchWalletAddress,
  fetchWalletChart,
  walletWithdraw,
  fetchWalletTransactionProgramFilter,
  openWallet
};
export default walletActions;
