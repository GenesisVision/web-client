import tradersActions from "../actions/traders-actions";
import walletActions from "../../wallet/actions/wallet-actions";
import walletPaneActions from "../../wallet-pane/actions/wallet-pane-actions";

const updateAfterInvestment = () => dispatch => {
  return Promise.all([
    dispatch(tradersActions.fetchTradersIfNeeded()),
    dispatch(walletPaneActions.fetchWalletPaneChart()),
    dispatch(walletPaneActions.fetchWalletPaneTransactions()),
    dispatch(walletActions.fetchWallet())
  ]);
};

const tradersService = { updateAfterInvestment };
export default tradersService;
