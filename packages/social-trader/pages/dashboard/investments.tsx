import { NextPage } from "next";
import InvestmentsPage from "pages/dashboard/investments.page.tsx";
import React from "react";
import withDefaultLayout from "shared/decorators/with-default-layout";

const Page: NextPage = () => {
  return <InvestmentsPage />;
};

export default withDefaultLayout(Page);
