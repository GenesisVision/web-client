import LoginLayout from "components/login-layout/login-layout";
import React from "react";
import "./reset-layout.scss";

const ResetPasswordLayout = ({ children }) => {
  return (
    <LoginLayout>
      <h1 className="reset-password__title">Restore Password</h1>
      {children}
    </LoginLayout>
  );
};

export default ResetPasswordLayout;
