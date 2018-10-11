import "./signup-email-pending.scss";

import { GVButton } from "gv-react-components";
import { SIGNUP_ROUTE } from "pages/auth/signup/signup.routes";
import React from "react";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";

const SignupEmailPending = ({ t, service }) => {
  return (
    <React.Fragment>
      <GVButton
        className="signup-email-pending__resend-btn"
        variant="text"
        onClick={service.sendConfirmationLink}
      >
        {t("auth.signup-email-pending.resend-button-text")}
      </GVButton>
    </React.Fragment>
  );
};

export default translate()(SignupEmailPending);
