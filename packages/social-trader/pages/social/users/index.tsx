import withBetaTesting from "decorators/with-beta-testing";
import withDefaultLayout from "decorators/with-default-layout";
import { NextPage } from "next";
import { UsersPage } from "pages/social/users/users.page";
import React from "react";
import { compose } from "redux";

const Page: NextPage = () => {
  return <UsersPage />;
};

Page.getInitialProps = async () => ({
  namespacesRequired: ["conversation", "users-page"]
});

export default compose(withDefaultLayout, withBetaTesting("Social"))(Page);
