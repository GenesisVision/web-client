import {
  calculateSkipAndTake,
  calculateTotalPages,
  composePaingActionType
} from "../../paging/helpers/paging-helpers";
import authService from "../../../services/auth-service";
import filterPaneActionsFactory from "../../filter-pane/actions/filter-pane-actions";
import pagingActionsFactory from "../../paging/actions/paging-actions";
import SwaggerInvestorApi from "../../../services/api-client/swagger-investor-api";

import * as actionTypes from "../actions/wallet-actions.constants";
import clearDataActionFactory from "../../../shared/actions/clear-data.factory";

const getWalletTransactions = () => (dispatch, getState) => {
  const { paging } = getState().walletData.transactions;
  const { skip, take } = calculateSkipAndTake(paging);

  let filter = {
    skip,
    take
  };

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
  dispatch({
    type: actionTypes.WALLET_CHART,
    payload: SwaggerInvestorApi.apiInvestorWalletStatisticPost(
      authService.getAuthArg()
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

const walletService = {
  getWalletTransactions,
  getWalletChart,
  closeFilterPane,
  changePage,
  clearPaging
};

export default walletService;
