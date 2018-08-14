import { GVButton } from "gv-react-components";
import React from "react";
import { Link } from "react-router-dom";
import { FORGOT_PASSWORD_ROUTE } from "pages/forgot-password/forgot-password.routes";
import "./email-pending.scss";

const EmailPending = ({ onResendEmail, onContinue }) => {
  return (
    <React.Fragment>
      <div className="email-pending__resend-btn" onClick={onResendEmail}>
        Resend email
      </div>

      <Link to={FORGOT_PASSWORD_ROUTE} className="email-pending__btn-back">
        <GVButton color>&larr; Back</GVButton>
      </Link>
      <GVButton
        id="forgotPassword"
        title="submit restore form"
        color="primary"
        variant="contained"
        type="submit"
        onClick={onContinue}
      >
        Continue
      </GVButton>
    </React.Fragment>
  );
};

export default EmailPending;
