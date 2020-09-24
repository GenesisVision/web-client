import withDefaultLayout from "decorators/with-default-layout";
import { NextPage } from "next";
import Mt4Page from "pages/trade/mt4.page";
import React from "react";

const Page: NextPage = () => {
  return <Mt4Page />;
};

Page.getInitialProps = async () => ({
  namespacesRequired: ["mt4-page"]
});

export default withDefaultLayout(Page);
