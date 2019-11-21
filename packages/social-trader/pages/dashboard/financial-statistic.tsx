import withDefaultLayout from "decorators/with-default-layout";
import { NextPage } from "next";
import FinancialStatisticPage from "pages/dashboard/financial-statistic.page";
import React from "react";

const Page: NextPage = () => {
  return <FinancialStatisticPage />;
};

export default withDefaultLayout(Page);
