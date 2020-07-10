import SettingsPage from "components/profile/settings/settings.page";
import withDefaultLayout from "decorators/with-default-layout";
import withPrivateRoute from "decorators/with-private-route";
import { NextPage } from "next";
import React from "react";
import { compose } from "redux";

const Page: NextPage = () => {
  return <SettingsPage />;
};

Page.getInitialProps = async () => ({
  namespacesRequired: ["profile-page"]
});

export default compose(withDefaultLayout, withPrivateRoute)(Page);
