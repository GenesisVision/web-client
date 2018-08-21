import AuthLayout from "components/auth-layout/auth-layout";
import React from "react";

export const EMAIL_CONFIRM_ROUTE = "/email-confirm";
export const EMAIL_CONFIRM_PENDING_ROUTE = "/email-confirm/pending";

const EmailConfirmRoutes = () => {
  return (
    <AuthLayout>
      <div className={"email-confirm"}>
        <h1>Confirm your Email</h1>
        <p>Please check your inbox for a confirmation email.</p>
      </div>
    </AuthLayout>
  );
};

export default EmailConfirmRoutes;
