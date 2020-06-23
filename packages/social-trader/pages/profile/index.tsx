import ProfilePage from "components/profile/profile/profile.page";
import withDefaultLayout from "decorators/with-default-layout";
import withPrivateRoute from "decorators/with-private-route";
import { NextPage } from "next";
import React from "react";
import { compose } from "redux";

const Page: NextPage = () => {
  return <ProfilePage />;
};

Page.getInitialProps = async () => ({
  namespacesRequired: ["asset-settings", "profile-page"]
});

export default compose(withDefaultLayout, withPrivateRoute)(Page);
