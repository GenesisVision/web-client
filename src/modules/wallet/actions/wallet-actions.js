import {
  calculateTotalPages,
  calculateSkipAndTake
} from "../helpers/paging-helper";
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

const fetchWalletTransactions = () => (dispatch, getState) => {
  const { paging, filtering } = getState().walletData.transactions;
  const { skip, take } = calculateSkipAndTake(paging);

  let filter = {
    skip,
    take
  };
  if (filtering.investmentProgramId) {
    filter.investmentProgramId = filtering.investmentProgramId;
  }
  if (filtering.type) {
    filter.type = filtering.type;
  }

  dispatch({
    type: actionTypes.WALLET_TRANSACTIONS,
    payload: SwaggerInvestorApi.apiInvestorWalletTransactionsPost(
      authService.getAuthArg(),
      { filter }
    )
  }).then(response => {
    const totalPages = calculateTotalPages(response.value.total);
    dispatch(updateWalletTransactionsPaging({ totalPages }));
  });
};

const fetchWalletTransactionProgramFilter = () => {
  return {
    type: actionTypes.WALLET_TRANSACTION_PROGRAM_FILTER,
    payload: SwaggerInvestorApi.apiInvestorWalletTransactionsInvestmentProgramsListGet(
      authService.getAuthArg()
    )
  };
};

const updatePaging = paging => dispatch => {
  dispatch(updateWalletTransactionsPaging(paging));
  dispatch(fetchWalletTransactions());
};

const updateWalletTransactionsPaging = paging => {
  return {
    type: actionTypes.WALLET_TRANSACTIONS_PAGING,
    paging
  };
};

const updateFiltering = filter => dispatch => {
  dispatch(updateWalletTransactionsFiltering(filter));
  dispatch(updateWalletTransactionsPaging({ currentPage: 0 }));
  dispatch(fetchWalletTransactions());
};

const updateWalletTransactionsFiltering = filter => {
  let filtering = {};
  if (filter.name === "program") {
    filtering.investmentProgramId = filter.value;
  }
  if (filter.name === "transactionType") {
    filtering.type = filter.value;
  }

  return {
    type: actionTypes.WALLET_TRANSACTIONS_FILTERING,
    filtering
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
  openWallet,
  updatePaging,
  updateFiltering
};
export default walletActions;
