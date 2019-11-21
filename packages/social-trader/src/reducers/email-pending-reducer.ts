import { EMAIL_PENDING, TSaveEmailAction } from "actions/email-pending-actions";

import defaultReducer from "./reducer-creators/default-reducer";

export type EmailPendingState = {
  readonly email: string;
};

const initialState: EmailPendingState = {
  email: ""
} as EmailPendingState;

const emailPendingReducer = (
  state: EmailPendingState = initialState,
  action: TSaveEmailAction
): EmailPendingState =>
  defaultReducer<TSaveEmailAction, EmailPendingState>(
    action,
    state,
    initialState,
    EMAIL_PENDING
  );

export default emailPendingReducer;
