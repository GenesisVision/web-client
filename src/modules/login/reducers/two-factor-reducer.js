import { HOME_ROUTE } from "routes/root.routes";
import { composeClearDataActionType } from "shared/actions/clear-data.factory";

import { LOGIN_TWO_FACTOR } from "../actions/login-actions";

export const initialState = {
  email: "",
  password: "",
  from: HOME_ROUTE
};

const clearDataActionType = composeClearDataActionType(LOGIN_TWO_FACTOR);

const twoFactorReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_TWO_FACTOR: {
      return {
        email: action.payload.email,
        password: action.payload.password,
        from: action.payload.from
      };
    }
    case clearDataActionType:
      return initialState;
    default:
      return state;
  }
};

export default twoFactorReducer;
