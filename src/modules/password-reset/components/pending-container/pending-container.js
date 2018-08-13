import React from "react";
import { connect } from "react-redux";

import passwordResetService from "../../service/password-reset-service";
import Pending from "./pending/pending";

const PendingContainer = ({ sendEmail, continueResetPassword }) => (
  <Pending onResendEmail={sendEmail} onContinue={continueResetPassword} />
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
)(PendingContainer);
