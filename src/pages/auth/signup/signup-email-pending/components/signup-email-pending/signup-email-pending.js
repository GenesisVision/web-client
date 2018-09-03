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
        {t("auth.email-pending.email-resend-button-text")}
      </GVButton>
      <div className="signup-email-pending__navigation">
        <Link to={SIGNUP_ROUTE} className="signup-email-pending__btn-back">
          <GVButton variant="text" color="secondary">
            &larr; {t("auth.email-pending.back-button-text")}
          </GVButton>
        </Link>
        {/* <GVButton
          color="primary"
          variant="contained"
          type="submit"
          onClick={continueConfirmEmail}
        >
          {t("auth.email-pending.confirm-button-text")}
        </GVButton> */}
      </div>
    </React.Fragment>
  );
};

export default translate()(SignupEmailPending);
