import { PROGRAM_REINVEST } from "modules/program-reinvesting/actions/program-reinvesting.actions";
import {
  FAILURE_SUFFIX,
  REQUEST_SUFFIX
} from "shared/reducers/api-reducer/api-reducer";

export const initialState = {
  value: "BTC"
};

const walletCurrencyReducer = (state = initialState, action) => {
  return state;
};

export default walletCurrencyReducer;
