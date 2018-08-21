import React from "react";
import { connect } from "react-redux";

import signUpService from "../../service/signup-service";
import EmailPending from "./signup-email-pending/signup-email-pending";

const EmailPendingContainer = ({ sendEmail, continueConfirmEmail }) => (
  <EmailPending onResendEmail={sendEmail} onContinue={continueConfirmEmail} />
);

const mapDispatchToProps = dispatch => ({
  sendEmail: () => {
    dispatch(signUpService.resendConfirmationLink());
  },
  continueConfirmEmail: () => {
    dispatch(signUpService.confirmEmail());
  }
});

export default connect(
  null,
  mapDispatchToProps
)(EmailPendingContainer);
