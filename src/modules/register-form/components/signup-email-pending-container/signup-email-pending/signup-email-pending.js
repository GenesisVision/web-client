import { GVButton } from "gv-react-components";
import React from "react";
import { Link } from "react-router-dom";
import { FORGOT_PASSWORD_ROUTE } from "pages/forgot-password/forgot-password.routes";
import "./signup-email-pending.scss";

const EmailPending = ({ onResendEmail, onContinue }) => {
  return (
    <React.Fragment>
      <GVButton
        className="signup-email-pending__resend-btn"
        variant="text"
        onClick={onResendEmail}
      >
        Resend email
      </GVButton>
      <div className="signup-email-pending__navigation">
        <Link
          to={FORGOT_PASSWORD_ROUTE}
          className="signup-email-pending__btn-back"
        >
          <GVButton variant="text">&larr; Back</GVButton>
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
      </div>
    </React.Fragment>
  );
};

export default EmailPending;
