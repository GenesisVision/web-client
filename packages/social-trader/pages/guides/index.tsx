import withDefaultLayout from "decorators/with-default-layout";
import { NextPage } from "next";
import GuidesPage from "pages/guides/guides.page";
import React from "react";
import { compose } from "redux";

const Page: NextPage<{}> = () => {
  return <GuidesPage />;
};

Page.getInitialProps = async () => ({
  namespacesRequired: ["guides"]
});

export default compose(withDefaultLayout)(Page);
