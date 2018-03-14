import apiReducerFactory from "../../../shared/reducers/api-reducer/api-reducer";

import { WALLET_CHART } from "../actions/wallet-actions.constants";

const walletChartReducer = apiReducerFactory({
  apiType: WALLET_CHART
});

export default walletChartReducer;
