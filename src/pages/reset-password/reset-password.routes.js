import ResetPasswordLayout from "components/reset-layout/reset-layout";
import ResetPasswordContainer from "modules/password-reset/components/reset-password-container/reset-password-container";
import qs from "qs";
import React from "react";

export const RESET_PASSWORD_ROUTE = "/reset-password";

const ResetPasswordRoutes = ({ location }) => {
  const queryParams = qs.parse(location.search.slice(1));
  return (
    <ResetPasswordLayout>
      <p>Just enter new password</p>
      <ResetPasswordContainer queryParams={queryParams} />
    </ResetPasswordLayout>
  );
};

export default ResetPasswordRoutes;
