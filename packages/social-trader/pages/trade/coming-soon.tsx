import withDefaultLayout from "decorators/with-default-layout";
import { NextPage } from "next";
import ComingSoonPage from "pages/trade/coming-soon.page";
import React from "react";

const Page: NextPage = () => {
  return <ComingSoonPage />;
};

export default withDefaultLayout(Page);
