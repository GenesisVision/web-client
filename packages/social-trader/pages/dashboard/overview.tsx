import { NextPage } from "next";
import OverviewPage from "pages/dashboard/overview.page";
import React from "react";
import withDefaultLayout from "shared/decorators/with-default-layout";

const Page: NextPage = () => {
  return <OverviewPage />;
};

export default withDefaultLayout(Page);
