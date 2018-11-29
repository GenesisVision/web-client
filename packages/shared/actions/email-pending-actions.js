export const EMAIL_PENDING = "EMAIL_PENDING";

const saveEmail = ({ email }) => ({
  type: EMAIL_PENDING,
  payload: {
    email
  }
});

const emailPeningActions = {
  saveEmail
};

export default emailPeningActions;
