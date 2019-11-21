import withDefaultLayout from "decorators/with-default-layout";
import { NextPage } from "next";
import InvestmentsPage from "pages/dashboard/investments.page.tsx";
import React from "react";

const Page: NextPage = () => {
  return <InvestmentsPage />;
};

export default withDefaultLayout(Page);
