import LoginLayout from "components/login-layout/login-layout";
import React from "react";

const RestorePasswordLayout = ({ children }) => {
  return (
    <LoginLayout>
      <h1>Restore password</h1>
      {children}
    </LoginLayout>
  );
};

export default RestorePasswordLayout;
