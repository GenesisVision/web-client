import withDefaultLayout from "decorators/with-default-layout";
import { NextPage } from "next";
import PortfolioEventsAllComponent from "pages/dashboard/components/dashboard-portfolio-events-all/dashboard-portfolio-events-all";
import React from "react";

const Page: NextPage = () => {
  return <PortfolioEventsAllComponent />;
};

export default withDefaultLayout(Page);
