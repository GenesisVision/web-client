import ForgotPasswordContainer from "modules/password-reset/components/forgot-password-container/forgot-password-container";
import React from "react";

const ForgotPassword = () => {
  return (
    <div className={"forgot-password"}>
      <h1>Restore Password</h1>
      <p>Just enter the email address you used to create your account.</p>
      <ForgotPasswordContainer />
    </div>
  );
};

export default ForgotPassword;
