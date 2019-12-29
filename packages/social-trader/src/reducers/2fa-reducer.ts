import {
  TWO_FACTOR_AUTH,
  TWO_FACTOR_SET_REQUIREMENT
} from "actions/2fa-actions";
import { TwoFactorStatus } from "gv-api-web";
import apiReducerFactory, {
  IApiState
} from "reducers/reducer-creators/api-reducer";
import { apiSelector } from "utils/selectors";
import { apiFieldSelector, fieldSelector } from "utils/selectors";

const data = {
  twoFactorEnabled: false
};

export type ITwoFactorReducer = Readonly<IApiState<TwoFactorStatus>>;

export const twoFactorSelector = apiSelector<TwoFactorStatus>(
  state => state.accountSettings.twoFactorAuth
);

export const twoFactorEnabledSelector = apiFieldSelector(
  twoFactorSelector,
  fieldSelector(state => state.twoFactorEnabled),
  false
);

const twoFactorReducer = apiReducerFactory<TwoFactorStatus>(
  {
    apiType: TWO_FACTOR_AUTH
  },
  (state: ITwoFactorReducer, action: any): ITwoFactorReducer => {
    if (!state.data) {
      return {
        ...state,
        data
      };
    }
    if (action.type === TWO_FACTOR_SET_REQUIREMENT) {
      return {
        ...state,
        data: {
          ...state.data,
          twoFactorEnabled: action.payload.twoFactorEnabled
        }
      };
    }
    return state;
  }
);

export default twoFactorReducer;
