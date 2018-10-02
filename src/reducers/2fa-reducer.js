import { TWO_FACTOR_AUTH } from "actions/2fa-actions";
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
    return state;
  }
);

export default twoFactorReducer;
