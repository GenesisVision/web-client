import { EMAIL_PENDING } from "shared/actions/email-pending-actions";
import { ActionType } from "shared/utils/types";

import defaultReducer from "./reducer-creators/default-reducer";

export type EmailPendingState = {
  readonly email: string;
};

const initialState: EmailPendingState = {
  email: ""
} as EmailPendingState;

const emailPendingReducer = (
  state: EmailPendingState = initialState,
  action: ActionType<EmailPendingState>
): EmailPendingState =>
  defaultReducer<ActionType<EmailPendingState>, EmailPendingState>(
    action,
    state,
    initialState,
    EMAIL_PENDING
  );

export default emailPendingReducer;
