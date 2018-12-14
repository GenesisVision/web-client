import React, { Fragment } from "react";
import DashboardPortfolioChartSectionLoader2 from "./dashboard-portfolio-chart-section-loader-2.js";
import DashboardPortfolioChartSectionLoader from "./dashboard-portfolio-chart-section-loader.js";


const DashboardPortfolioChartLoader = () => (
  <Fragment>
    <DashboardPortfolioChartSectionLoader2 />
    <DashboardPortfolioChartSectionLoader />
  </Fragment>
);

export default DashboardPortfolioChartLoader;

