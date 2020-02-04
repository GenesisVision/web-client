import PasswordPage from "components/profile/password/password.page";
import withDefaultLayout from "decorators/with-default-layout";
import withPrivateRoute from "decorators/with-private-route";
import React from "react";
import { compose } from "redux";

const Page: React.FC = () => {
  return <PasswordPage />;
};

export const Password = compose(withDefaultLayout, withPrivateRoute)(Page);
