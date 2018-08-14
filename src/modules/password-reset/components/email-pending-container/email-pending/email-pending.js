import { GVButton } from "gv-react-components";
import React from "react";
import { Link } from "react-router-dom";
import { FORGOT_PASSWORD_ROUTE } from "pages/forgot-password/forgot-password.routes";
import "./email-pending.scss";

const EmailPending = ({ onResendEmail, onContinue }) => {
  return (
    <React.Fragment>
      <GVButton
        className="email-pending__resend-btn"
        variant="text"
        onClick={onResendEmail}
      >
        Resend email
      </GVButton>
      <div className="email-pending__navigation">
        <Link to={FORGOT_PASSWORD_ROUTE} className="email-pending__btn-back">
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
