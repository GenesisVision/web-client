import filterPaneReducerFactory from "../../filter-pane/reducers/filter-pane-reducers";

import { WALLET } from "../actions/wallet-actions.constants";

const walletFilterPaneReducer = filterPaneReducerFactory(WALLET);

export default walletFilterPaneReducer;
