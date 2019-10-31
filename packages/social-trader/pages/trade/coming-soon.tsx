import { NextPage } from "next";
import ComingSoonPage from "pages/trades/coming-soon.page";
import React from "react";
import withDefaultLayout from "shared/decorators/with-default-layout";

const Page: NextPage = () => {
  return <ComingSoonPage />;
};

export default withDefaultLayout(Page);
