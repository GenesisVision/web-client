import LoginLayout from "components/login-layout/login-layout";
import React from "react";

const EmailConfirm = () => {
  return (
    <LoginLayout>
      <div className={"email-confirm"}>
        <h1>Confirm your Email</h1>
        <p>Please check your inbox for a confirmation email.</p>
      </div>
    </LoginLayout>
  );
};

export default EmailConfirm;
