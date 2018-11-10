import { TWO_FACTOR_AUTH } from "shared/actions/2fa-actions";
import { TWO_FACTOR_SET_REQUIREMENT } from "shared/actions/2fa-actions";
import apiReducerFactory from "shared/reducers/api-reducer/api-reducer";

const data = {
  twoFactorEnabled: false
};

const twoFactorReducer = apiReducerFactory(
  {
    apiType: TWO_FACTOR_AUTH
  },
  (state, action) => {
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
