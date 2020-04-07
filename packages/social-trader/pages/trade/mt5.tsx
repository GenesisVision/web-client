import withDefaultLayout from "decorators/with-default-layout";
import { NextPage } from "next";
import Mt5Page from "pages/trades/mt5.page";
import React from "react";

const Page: NextPage = () => {
  return <Mt5Page />;
};

Page.getInitialProps = async () => ({
  namespacesRequired: ["mt5-page"]
});

export default withDefaultLayout(Page);
