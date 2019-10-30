import { NextPage } from "next";
import PortfolioEventsAllComponent from "pages/dashboard/components/dashboard-portfolio-events-all/dashboard-portfolio-events-all";
import React from "react";
import withDefaultLayout from "shared/decorators/with-default-layout";

const Page: NextPage = () => {
  return <PortfolioEventsAllComponent />;
};

export default withDefaultLayout(Page);
