import { composeClearDataActionType } from "shared/actions/clear-data.factory";
import { LOGIN_TWO_FACTOR, TStoreTwoFactorAction } from "shared/components/auth/login/login.actions";
import { HOME_ROUTE } from "shared/routes/app.routes";

export const initialState = {
  email: "",
  password: "",
  from: { HOME_ROUTE }
};

const clearDataActionType = composeClearDataActionType(LOGIN_TWO_FACTOR);

export type ITwoFactorState = Readonly<{
  email: string;
  password: string;
  from: string | object;
}>;

const twoFactorReducer = (
  state: ITwoFactorState = initialState,
  action: TStoreTwoFactorAction
): ITwoFactorState => {
  switch (action.type) {
    case LOGIN_TWO_FACTOR: {
      return action.payload;
    }
    case clearDataActionType:
      return initialState;
    default:
      return state;
  }
};

export default twoFactorReducer;
