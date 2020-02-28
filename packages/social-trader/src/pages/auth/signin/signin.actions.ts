import { ActionType } from "utils/types";

import { ITwoFactorState } from "./reducers/two-factor.reducer";

export const LOGIN_TWO_FACTOR = "LOGIN_TWO_FACTOR";

export enum CODE_TYPE {
  TWO_FACTOR = "twoFactorCode",
  RECOVERY = "recoveryCode"
}

export type TStoreTwoFactorAction = ActionType<ITwoFactorState>;
export const storeTwoFactorAction = ({
  email,
  password,
  from
}: ITwoFactorState): TStoreTwoFactorAction => ({
  type: LOGIN_TWO_FACTOR,
  payload: {
    email,
    password,
    from
  }
});
