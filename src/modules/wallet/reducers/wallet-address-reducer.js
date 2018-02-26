import apiReducerFactory from "../../../shared/reducers/api-reducer/api-reducer";

import { WALLET_ADDRESS } from "../actions/wallet-actions.constants";

const walletAddressReducer = apiReducerFactory({
  apiType: WALLET_ADDRESS
});

export default walletAddressReducer;
