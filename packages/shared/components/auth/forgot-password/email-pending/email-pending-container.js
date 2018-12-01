import React from "react";
import { connect } from "react-redux";

import EmailPending from "./email-pending";

const EmailPendingContainer = ({ sendEmail, continuePasswordRestore }) => (
  <EmailPending
    onResendEmail={sendEmail}
    onContinue={continuePasswordRestore}
  />
);

const mapDispatchToProps = (dispatch, props) => ({
  sendEmail: () => {
    dispatch(props.forgotPasswordService.sendForgotPasswordEmail());
  },
  continuePasswordRestore: () => {
    dispatch(props.forgotPasswordService.navigateToPasswordRestore());
  }
});

export default connect(
  null,
  mapDispatchToProps
)(EmailPendingContainer);
