import apiReducerFactory from "../../../shared/reducers/api-reducer/api-reducer";

import { TRADER_DEPOSIT } from "../actions/trader-deposit-actions.constants";

const traderDepositReducer = apiReducerFactory({ apiType: TRADER_DEPOSIT });
export default traderDepositReducer;
