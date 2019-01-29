import { TwoFactorStatus } from "gv-api-web";
import { TWO_FACTOR_AUTH } from "shared/actions/2fa-actions";
import { TWO_FACTOR_SET_REQUIREMENT } from "shared/actions/2fa-actions";
import apiReducerFactory, {
  IApiReducerFactory
} from "shared/reducers/api-reducer/api-reducer";

const data = {
  twoFactorEnabled: false
};

export interface ITwoFactorReducer
  extends IApiReducerFactory<TwoFactorStatus> {}

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
