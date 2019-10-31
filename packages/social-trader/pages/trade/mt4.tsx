import { NextPage } from "next";
import Mt4Page from "pages/trades/mt4.page";
import React from "react";
import withDefaultLayout from "shared/decorators/with-default-layout";

const Page: NextPage = () => {
  return <Mt4Page />;
};

export default withDefaultLayout(Page);
