import apiReducerFactory from "../../../shared/reducers/api-reducer/api-reducer";

import { WALLET } from "../actions/wallet-actions.constants";

const walletReducer = apiReducerFactory({ apiType: WALLET });

export default walletReducer;
