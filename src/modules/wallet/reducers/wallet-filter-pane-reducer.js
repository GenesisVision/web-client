import filterPaneReducerFactory from "../../filter-pane/reducers/filter-pane-reducers";

import { WALLET_FILTER_PANE } from "../actions/wallet-actions.constants";

const walletFilterPaneReducer = filterPaneReducerFactory(WALLET_FILTER_PANE);

export default walletFilterPaneReducer;
