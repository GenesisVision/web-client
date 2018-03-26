import authService from "../../../services/auth-service";
import SwaggerInvestorApi from "../../../services/api-client/swagger-investor-api";
import * as actionTypes from "./wallet-pane-actions.constants";

const fetchWalletPaneTransactions = () => {
  const data = {
    filter: {
      take: 5
    }
  };
  return {
    type: actionTypes.WALLET_PANE_TRANSACTIONS,
    payload: SwaggerInvestorApi.apiInvestorWalletTransactionsPost(
      authService.getAuthArg(),
      data
    )
  };
};

const fetchWalletPaneChart = () => {
  const data = {
    filter: {
      type: "Internal",
      isFull: false
    }
  };
  return {
    type: actionTypes.WALLET_PANE_CHART,
    payload: SwaggerInvestorApi.apiInvestorWalletStatisticPost(
      authService.getAuthArg(),
      data
    )
  };
};

const walletPaneActions = {
  fetchWalletPaneTransactions,
  fetchWalletPaneChart
};
export default walletPaneActions;
