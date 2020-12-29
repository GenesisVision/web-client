import SecurityPage from "components/profile/security/security.page";
import withDefaultLayout from "decorators/with-default-layout";
import withPrivateRoute from "decorators/with-private-route";
import { NextPage } from "next";
import React from "react";
import { compose } from "redux";

const Page: NextPage = () => {
  return <SecurityPage />;
};

Page.getInitialProps = async () => ({
  namespacesRequired: ["auth", "profile-page"]
});

export default compose(withDefaultLayout, withPrivateRoute)(Page);
