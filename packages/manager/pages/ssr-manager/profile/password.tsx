import React from "react";
import { compose } from "redux";
import PasswordPage from "shared/components/profile/password/password.page";
import withDefaultLayout from "shared/decorators/with-default-layout";
import withPrivateRoute from "shared/decorators/with-private-route";

const Password: React.FC = () => {
  return <PasswordPage />;
};

export default compose(
  withDefaultLayout,
  withPrivateRoute
)(Password);
