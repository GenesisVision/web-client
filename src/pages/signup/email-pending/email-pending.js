import React, { Fragment } from "react";
import "./email-pending.scss";
import EmailPendingContainer from "modules/register-form/components/signup-email-pending-container/signup-email-pending-container";

const EmailPending = () => {
  return (
    <div className="signup-email">
      <h1 className="signup-email-pending__title">Confirm your Email</h1>
      <p className="signup-email-pending__text">
        Please check your inbox for a confirmation email. Click the link in the
        email to create new password.
      </p>
      <p className="signup-email-pending__text">
        After you confirm click Continue
      </p>
      <EmailPendingContainer />
    </div>
  );
};

export default EmailPending;
