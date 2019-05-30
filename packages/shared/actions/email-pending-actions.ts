import { EmailPendingState } from "shared/reducers/email-pending-reducer";
import { ActionType } from "shared/utils/types";

export const EMAIL_PENDING = "EMAIL_PENDING";

const saveEmail = ({
  email
}: EmailPendingState): ActionType<EmailPendingState> => ({
  type: EMAIL_PENDING,
  payload: {
    email
  }
});

const emailPendingActions = {
  saveEmail
};

export default emailPendingActions;
