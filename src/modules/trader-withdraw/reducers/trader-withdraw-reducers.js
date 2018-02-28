import apiReducerFactory from "../../../shared/reducers/api-reducer/api-reducer";

import { TRADER_WITHDRAW } from "../actions/trader-withdraw-actions.constants";

const traderWithdrawReducer = apiReducerFactory({ apiType: TRADER_WITHDRAW });
export default traderWithdrawReducer;
