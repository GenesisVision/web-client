import { HOME_ROUTE } from "pages/app/app.routes";
import { composeClearDataActionType } from "shared/actions/clear-data.factory";
import { DeepReadonly } from "utility-types";

import { LOGIN_TWO_FACTOR } from "../actions/login.actions";

export const initialState = {
  email: "",
  password: "",
  from: { HOME_ROUTE }
};

const clearDataActionType = composeClearDataActionType(LOGIN_TWO_FACTOR);

export type ITwoFactorReducer = DeepReadonly<{
  email: string;
  password: string;
  from: string | object;
}>;

const twoFactorReducer = (
  state: ITwoFactorReducer = initialState,
  action: any
): ITwoFactorReducer => {
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
