import withDefaultLayout from "decorators/with-default-layout";
import { NextPage } from "next";
import { UsersPage } from "pages/social/users/users.page";
import React from "react";
import { compose } from "redux";

const Page: NextPage = () => {
  return <UsersPage />;
};

Page.getInitialProps = async () => ({
  namespacesRequired: [
    "manager-page",
    "form-fields",
    "conversation",
    "users-page"
  ]
});

export default compose(withDefaultLayout)(Page);
