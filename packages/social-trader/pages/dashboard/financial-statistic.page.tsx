import { NextPage } from "next";
import FinancialStatisticPage from "pages/dashboard/financial-statistic.page";
import React from "react";
import withDefaultLayout from "shared/decorators/with-default-layout";

const Page: NextPage = () => {
  return <FinancialStatisticPage />;
};

export default withDefaultLayout(Page);
