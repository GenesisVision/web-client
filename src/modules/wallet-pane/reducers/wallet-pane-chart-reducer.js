import apiReducerFactory from "../../../shared/reducers/api-reducer/api-reducer";
import {WALLET_PANE_CHART} from "../actions/wallet-pane-actions.constants";

const walletPaneChartReducer = apiReducerFactory({
  apiType: WALLET_PANE_CHART
});

export default walletPaneChartReducer;
