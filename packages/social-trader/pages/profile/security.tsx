import SecurityPage from "components/profile/security/security.page";
import withDefaultLayout from "decorators/with-default-layout";
import withPrivateRoute from "decorators/with-private-route";
import React from "react";
import { compose } from "redux";

const Page: React.FC = () => {
  return <SecurityPage />;
};

export default compose(withDefaultLayout, withPrivateRoute)(Page);
