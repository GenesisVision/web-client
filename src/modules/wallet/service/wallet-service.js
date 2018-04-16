import {
  calculateSkipAndTake,
  calculateTotalPages,
  composePaingActionType
} from "../../paging/helpers/paging-helpers";
import { composeFilteringActionType } from "../../filtering/helpers/filtering-helpers";
import authService from "../../../services/auth-service";
import filteringActionsFactory from "../../filtering/actions/filtering-actions";
import filterPaneActionsFactory from "../../filter-pane/actions/filter-pane-actions";
import pagingActionsFactory from "../../paging/actions/paging-actions";
import SwaggerInvestorApi from "../../../services/api-client/swagger-investor-api";

import * as actionTypes from "../actions/wallet-actions.constants";
import clearDataActionFactory from "../../../shared/actions/clear-data.factory";

const getWalletTransactions = () => (dispatch, getState) => {
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
    dispatch(updatePaging({ totalPages }));
  });
};

const getWalletChart = () => (dispatch, getState) => {
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

const updatePaging = paging => {
  const pagingActionsDealList = pagingActionsFactory(
    actionTypes.WALLET_TRANSACTIONS
  );
  return pagingActionsDealList.updatePaging(paging);
};

const changePage = paging => dispatch => {
  dispatch(updatePaging(paging));
  dispatch(getWalletTransactions());
};

const changeFilter = filter => dispatch => {
  dispatch(updateFiltering(filter));
  dispatch(updatePaging({ currentPage: 0 }));
  dispatch(getWalletTransactions());
  dispatch(getWalletChart());
};

const updateFiltering = filter => {
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

const closeFilterPane = () => {
  const filterPaneActions = filterPaneActionsFactory(actionTypes.WALLET);
  return filterPaneActions.closeFilter();
};

const clearPaging = () => dispatch => {
  dispatch(
    clearDataActionFactory(
      composePaingActionType(actionTypes.WALLET_TRANSACTIONS)
    ).clearData()
  );
};

const clearFiltering = () => dispatch => {
  dispatch(
    clearDataActionFactory(
      composeFilteringActionType(actionTypes.WALLET_TRANSACTIONS)
    ).clearData()
  );
};

const walletService = {
  getWalletTransactions,
  getWalletChart,
  closeFilterPane,
  changeFilter,
  changePage,
  clearPaging,
  clearFiltering
};

export default walletService;
