import { NextPage } from "next";
import Mt5Page from "pages/trades/mt5.page";
import React from "react";
import withDefaultLayout from "shared/decorators/with-default-layout";

const Page: NextPage = () => {
  return <Mt5Page />;
};

export default withDefaultLayout(Page);
