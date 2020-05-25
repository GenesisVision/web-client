import withBetaTesting from "decorators/with-beta-testing";
import withDefaultLayout from "decorators/with-default-layout";
import { NextPage } from "next";
import { SocialPage } from "pages/social/social/social.page";
import React from "react";
import { compose } from "redux";

const Page: NextPage = () => {
  return <SocialPage />;
};

Page.getInitialProps = async () => ({
  namespacesRequired: ["social-page"]
});

export default compose(withDefaultLayout, withBetaTesting("Social"))(Page);
