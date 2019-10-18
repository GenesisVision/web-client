import React from "react";
import { compose } from "redux";
import PasswordPage from "shared/components/profile/password/password.page";
import withDefaultLayout from "shared/decorators/with-default-layout";
import withPrivateRoute from "shared/decorators/with-private-route";

const Page: React.FC = () => {
  return <PasswordPage />;
};

export const Password = compose(
  withDefaultLayout,
  withPrivateRoute
)(Page);
