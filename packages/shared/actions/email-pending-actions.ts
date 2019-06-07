import { EmailPendingState } from "shared/reducers/email-pending-reducer";
import { ActionType } from "shared/utils/types";

export const EMAIL_PENDING = "EMAIL_PENDING";

const saveEmailAction = (
  payload: EmailPendingState
): ActionType<EmailPendingState> => ({
  type: EMAIL_PENDING,
  payload
});

const emailPendingActions = {
  saveEmail: saveEmailAction
};

export default emailPendingActions;
