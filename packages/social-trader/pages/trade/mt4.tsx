import withDefaultLayout from "decorators/with-default-layout";
import { NextPage } from "next";
import Mt4Page from "pages/trades/mt4.page";
import React from "react";

const Page: NextPage = () => {
  return <Mt4Page />;
};

export default withDefaultLayout(Page);
