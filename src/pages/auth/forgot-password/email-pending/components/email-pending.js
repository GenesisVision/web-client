import { GVButton } from "gv-react-components";
import { FORGOT_PASSWORD_ROUTE } from "pages/auth/forgot-password/forgot-password.routes";
import React from "react";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";

const EmailPending = ({ onResendEmail, onContinue, t }) => {
  return (
    <React.Fragment>
      <div className="password-pending__resend">
        <GVButton variant="text" onClick={onResendEmail}>
          {t("auth.email-pending.email-resend-button-text")}
        </GVButton>
      </div>
    </React.Fragment>
  );
};

export default translate()(EmailPending);
