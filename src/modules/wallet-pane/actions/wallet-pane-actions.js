import authService from "../../../services/authService";
import SwaggerInvestorApi from "../../../services/api-client/swagger-investor-api";
import * as actionTypes from "./wallet-pane-actions.constants";

const fetchWalletPaneTransactions = () => {
  const data = {
    filter: {
      take: 4
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

const walletPaneActions = {
  fetchWalletPaneTransactions
};
export default walletPaneActions;
