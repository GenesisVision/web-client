import React from "react";
import { connect } from "react-redux";

import passwordRestoreService from "../../service/password-restore-service";
import EmailPending from "./email-pending/email-pending";

const EmailPendingContainer = ({ sendEmail, continuePasswordRestore }) => (
  <EmailPending
    onResendEmail={sendEmail}
    onContinue={continuePasswordRestore}
  />
);

const mapDispatchToProps = dispatch => ({
  sendEmail: () => {
    dispatch(passwordRestoreService.sendForgotPasswordEmail());
  },
  continuePasswordRestore: () => {
    dispatch(passwordRestoreService.navigateToPasswordRestore());
  }
});

export default connect(
  null,
  mapDispatchToProps
)(EmailPendingContainer);
