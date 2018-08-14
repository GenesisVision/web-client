import ResetPasswordContainer from "modules/password-reset/components/reset-password-container/reset-password-container";
import qs from "qs";
import React from "react";

import "./reset-password.scss";

export const RESET_PASSWORD_ROUTE = "/reset-password";

const ResetPassword = ({ location }) => {
  const queryParams = qs.parse(location.search.slice(1));
  return (
    <div>
      <h1 className="reset-password__title">Restore Password</h1>
      <p className="reset-password__text">Just enter new password</p>
      <ResetPasswordContainer queryParams={queryParams} />
    </div>
  );
};

export default ResetPassword;
