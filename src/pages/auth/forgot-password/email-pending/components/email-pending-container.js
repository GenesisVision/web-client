import React from "react";
import { connect } from "react-redux";

import forgotPasswordService from "../../services/forgot-password.service";
import EmailPending from "./email-pending";

const EmailPendingContainer = ({ sendEmail, continuePasswordRestore }) => (
  <EmailPending
    onResendEmail={sendEmail}
    onContinue={continuePasswordRestore}
  />
);

const mapDispatchToProps = dispatch => ({
  sendEmail: () => {
    dispatch(forgotPasswordService.sendForgotPasswordEmail());
  },
  continuePasswordRestore: () => {
    dispatch(forgotPasswordService.navigateToPasswordRestore());
  }
});

export default connect(
  null,
  mapDispatchToProps
)(EmailPendingContainer);
