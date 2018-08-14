import React from "react";
import { connect } from "react-redux";

import passwordResetService from "../../service/password-reset-service";
import EmailPending from "./email-pending/email-pending";

const EmailPendingContainer = ({ sendEmail, continueResetPassword }) => (
  <EmailPending onResendEmail={sendEmail} onContinue={continueResetPassword} />
);

const mapDispatchToProps = dispatch => ({
  sendEmail: () => {
    dispatch(passwordResetService.sendForgotPasswordEmail());
  },
  continueResetPassword: () => {
    dispatch(passwordResetService.allowResetPassword());
  }
});

export default connect(
  null,
  mapDispatchToProps
)(EmailPendingContainer);
