import {
  calculateTotalPages,
  calculateSkipAndTake
} from "../../paging/helpers/paging-helpers";
import authService from "../../../services/auth-service";
import filterPaneActionsFactory from "../../filter-pane/actions/filter-pane-actions";
import pagingActionsFactory from "../../paging/actions/paging-actions";
import SwaggerInvestorApi from "../../../services/api-client/swagger-investor-api";

import * as actionTypes from "./wallet-actions.constants";
import filteringActionsFactory from "../../filtering/actions/filtering-actions";

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

const fetchWalletChart = () => (dispatch, getState) => {
  const { filtering } = getState().walletData.transactions;
  let filter = {};
  if (filtering.type) {
    filter.type = filtering.type;
  }
  dispatch({
    type: actionTypes.WALLET_CHART,
    payload: SwaggerInvestorApi.apiInvestorWalletStatisticPost(
      authService.getAuthArg(),
      { filter }
    )
  });
};

const fetchWalletTransactionProgramFilter = () => {
  return {
    type: actionTypes.WALLET_FILER_PANE_PROGRAMS,
    payload: SwaggerInvestorApi.apiInvestorWalletTransactionsInvestmentProgramsListGet(
      authService.getAuthArg()
    )
  };
};

const updateWalletTransactionsPaging = paging => {
  const pagingActionsDealList = pagingActionsFactory(
    actionTypes.WALLET_TRANSACTIONS
  );
  return pagingActionsDealList.updatePaging(paging);
};

const updateWalletTransactionsPagingAndFetch = paging => dispatch => {
  dispatch(updateWalletTransactionsPaging(paging));
  dispatch(fetchWalletTransactions());
};

const closeFilterPane = () => {
  const filterPaneActions = filterPaneActionsFactory(actionTypes.WALLET);
  return filterPaneActions.closeFilter();
};

const updateFiltering = filter => dispatch => {
  dispatch(updateWalletTransactionsFiltering(filter));
  dispatch(updateWalletTransactionsPaging({ currentPage: 0 }));
  dispatch(fetchWalletTransactions());
  dispatch(fetchWalletChart());
};

const updateWalletTransactionsFiltering = filter => {
  const filteringActions = filteringActionsFactory(
    actionTypes.WALLET_TRANSACTIONS
  );
  let filtering = {};
  if (filter.name === "program") {
    filtering.investmentProgramId = filter.value;
  }
  if (filter.name === "transactionType") {
    filtering.type = filter.value;
  }

  return filteringActions.updateFiltering(filtering);
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
  fetchWalletTransactions,
  fetchWalletAddress,
  fetchWalletChart,
  walletWithdraw,
  fetchWalletTransactionProgramFilter,
  updateWalletTransactionsPaging,
  updateWalletTransactionsPagingAndFetch,
  updateFiltering,
  closeFilterPane
};
export default walletActions;
