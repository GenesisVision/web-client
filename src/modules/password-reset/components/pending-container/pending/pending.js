import { GVButton } from "gv-react-components";
import React from "react";
import { Link } from "react-router-dom";
import { FORGOT_PASSWORD_ROUTE } from "pages/forgot-password/forgot-password.routes";
import "./pending.scss";

const Pending = ({ onResendEmail, onContinue }) => {
  return (
    <React.Fragment>
      <div className="pending__resend-email-btn" onClick={onResendEmail}>
        Resend email
      </div>

      <Link to={FORGOT_PASSWORD_ROUTE} className="pending__btn-back">
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

export default Pending;
