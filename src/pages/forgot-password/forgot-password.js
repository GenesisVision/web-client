import ForgotPasswordContainer from "modules/password-reset/components/forgot-password-container/forgot-password-container";
import React from "react";
import "./forgot-password.scss";

const ForgotPassword = () => {
  return (
    <div className="forgot-password">
      <h1 className="forgot-password__title">Restore password</h1>
      <p className="forgot-password__text">
        Just enter the email address you used to create your account.
      </p>
      <ForgotPasswordContainer />
    </div>
  );
};

export default ForgotPassword;
