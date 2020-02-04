import withDefaultLayout from "decorators/with-default-layout";
import { NextPage } from "next";
import ComingSoonPage from "pages/trades/coming-soon.page";
import React from "react";

const Page: NextPage = () => {
  return <ComingSoonPage />;
};

export default withDefaultLayout(Page);
