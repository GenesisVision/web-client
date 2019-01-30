import { composeClearDataActionType } from "shared/actions/clear-data.factory";
import { EMAIL_PENDING } from "shared/actions/email-pending-actions";
import { ActionType } from "shared/utils/types";

export type EmailPendingState = {
  readonly email: string;
};

const initialState: EmailPendingState = {
  email: ""
} as EmailPendingState;

const clearDataActionType: string = composeClearDataActionType(EMAIL_PENDING);

const emailPendingReducer = (
  state: EmailPendingState = initialState,
  action: ActionType
): EmailPendingState => {
  switch (action.type) {
    case EMAIL_PENDING:
      return {
        email: action.payload.email
      };
    case clearDataActionType:
      return initialState;
    default:
      return state;
  }
};

export default emailPendingReducer;
