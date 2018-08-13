import React from "react";
import "./pending.scss";

const ResetPasswordPending = () => {
  return (
    <div>
      <h1 className="password-pending__title">Restore password</h1>
      <p className="password-pending__text">
        Please check your inbox for a confirmation email. Click the link in the
        email to create new password.
      </p>
      <p className="password-pending__text">After you confirm click Continue</p>
    </div>
  );
};

export default ResetPasswordPending;
