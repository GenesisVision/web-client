import defaultReducer from "reducers/reducer-creators/default-reducer";
import { HOME_ROUTE } from "routes/app.routes";

import { LOGIN_TWO_FACTOR, TStoreTwoFactorAction } from "../signin.actions";

export const initialState = {
  email: "",
  password: "",
  from: { HOME_ROUTE }
};

export type ITwoFactorState = Readonly<{
  email: string;
  password: string;
  from: string | object;
}>;

const twoFactorReducer = (
  state: ITwoFactorState = initialState,
  action: TStoreTwoFactorAction
): ITwoFactorState =>
  defaultReducer<TStoreTwoFactorAction, ITwoFactorState>(
    action,
    state,
    initialState,
    LOGIN_TWO_FACTOR
  );

export default twoFactorReducer;
