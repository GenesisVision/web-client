import { EmailPendingState } from "shared/reducers/email-pending-reducer";
import { ActionType } from "shared/utils/types";

export const EMAIL_PENDING = "EMAIL_PENDING";

export type TSaveEmailAction = ActionType<EmailPendingState>;
const saveEmailAction = (payload: EmailPendingState): TSaveEmailAction => ({
  type: EMAIL_PENDING,
  payload
});

const emailPendingActions = {
  saveEmail: saveEmailAction
};

export default emailPendingActions;
