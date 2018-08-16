import "./email-pending.scss";

import { GVButton } from "gv-react-components";
import { FORGOT_PASSWORD_ROUTE } from "pages/forgot-password/forgot-password.routes";
import React from "react";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";

const EmailPending = ({ onResendEmail, onContinue, t }) => {
  return (
    <React.Fragment>
      <GVButton
        className="email-pending__resend-btn"
        variant="text"
        onClick={onResendEmail}
      >
        {t("email-pending.email-resend-button-text")}
      </GVButton>
      <div className="email-pending__navigation">
        <Link to={FORGOT_PASSWORD_ROUTE} className="email-pending__btn-back">
          <GVButton variant="text">
            &larr; {t("email-pending.back-button-text")}
          </GVButton>
        </Link>
        <GVButton
          id="forgotPassword"
          title="submit restore form"
          color="primary"
          variant="contained"
          type="submit"
          onClick={onContinue}
        >
          {t("email-pending.confirm-button-text")}
        </GVButton>
      </div>
    </React.Fragment>
  );
};

export default translate()(EmailPending);
