import apiReducerFactory from "../../../shared/reducers/api-reducer/api-reducer";

import { WALLET_PANE_TRANSACTIONS } from "../actions/wallet-pane-actions.constants";

const walletPaneTransactionsReducer = apiReducerFactory({
  apiType: WALLET_PANE_TRANSACTIONS
});

export default walletPaneTransactionsReducer;
