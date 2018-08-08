import LoginLayout from "components/login-layout/login-layout";
import React from "react";

export const EMAIL_CONFIRM_ROUTE = "/email-confirm";
export const EMAIL_CONFIRM_PENDING_ROUTE = "/email-confirm/pending";

const EmailConfirmRoutes = () => {
  return (
    <LoginLayout>
      <div className={"email-confirm"}>
        <h1>Confirm your Email</h1>
        <p>Please check your inbox for a confirmation email.</p>
      </div>
    </LoginLayout>
  );
};

export default EmailConfirmRoutes;
