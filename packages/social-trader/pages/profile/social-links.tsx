import withDefaultLayout from "decorators/with-default-layout";
import withPrivateRoute from "decorators/with-private-route";
import { NextPage } from "next";
import SocialLinksPage from "pages/profile/social-links/social-links.page";
import React from "react";
import { compose } from "redux";

const Page: NextPage = () => {
  return <SocialLinksPage />;
};

Page.getInitialProps = async () => ({
  namespacesRequired: ["profile-page"]
});

export default compose(withDefaultLayout, withPrivateRoute)(Page);
