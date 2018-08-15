import React from "react";
import { connect } from "react-redux";

import registerService from "../../service/register-service";
import EmailPending from "./signup-email-pending/signup-email-pending";

const EmailPendingContainer = ({ sendEmail, continueConfirmEmail }) => (
  <EmailPending onResendEmail={sendEmail} onContinue={continueConfirmEmail} />
);

const mapDispatchToProps = dispatch => ({
  sendEmail: () => {
    dispatch(registerService.sendForgotPasswordEmail());
  },
  continueConfirmEmail: () => {
    dispatch(registerService.confirmEmail());
  }
});

export default connect(
  null,
  mapDispatchToProps
)(EmailPendingContainer);
