import withDefaultLayout from "decorators/with-default-layout";
import { NextPage } from "next";
import Mt5Page from "pages/trades/mt5.page";
import React from "react";

const Page: NextPage = () => {
  return <Mt5Page />;
};

export default withDefaultLayout(Page);
