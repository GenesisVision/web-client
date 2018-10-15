import { GVButton } from "gv-react-components";
import React from "react";
import { translate } from "react-i18next";

const EmailPending = ({ onResendEmail, onContinue, t }) => {
  return (
    <React.Fragment>
      <div className="password-pending__resend">
        <GVButton variant="text" onClick={onResendEmail}>
          {t("auth.password-restore.email-pending.email-resend-button-text")}
        </GVButton>
      </div>
    </React.Fragment>
  );
};

export default translate()(EmailPending);
