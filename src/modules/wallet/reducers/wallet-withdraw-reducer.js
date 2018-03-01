import apiReducerFactory from "../../../shared/reducers/api-reducer/api-reducer";

import { WALLET_WITHDRAW } from "../actions/wallet-actions.constants";

const walletWithdrawReducer = apiReducerFactory({
  apiType: WALLET_WITHDRAW
});

export default walletWithdrawReducer;
