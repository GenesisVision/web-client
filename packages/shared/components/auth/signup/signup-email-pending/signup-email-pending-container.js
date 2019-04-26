import { GVButton } from "gv-react-components";
import React from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";

const SignupEmailPending = ({ t, service }) => (
  <GVButton
    className="signup-email-pending__resend-btn"
    variant="text"
    onClick={service.sendConfirmationLink}
  >
    {t("auth.signup-email-pending.resend-button-text")}
  </GVButton>
);

const mapDispatchToProps = (dispatch, props) => ({
  service: {
    sendConfirmationLink: () => dispatch(props.sendConfirmationLink())
  }
});

const SignupEmailPendingContainer = compose(
  translate(),
  connect(
    null,
    mapDispatchToProps
  )
)(SignupEmailPending);

export default SignupEmailPendingContainer;
