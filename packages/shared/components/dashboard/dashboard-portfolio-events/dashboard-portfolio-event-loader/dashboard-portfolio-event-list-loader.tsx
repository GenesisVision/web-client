import * as React from "react";

import DashboardPortfolioEventLoader from "./dashboard-portfolio-event-loader";

const DashboardPortfolioEventsListLoader: React.FC = () => (
  <>
    <DashboardPortfolioEventLoader />
    <DashboardPortfolioEventLoader />
    <DashboardPortfolioEventLoader />
  </>
);

export default React.memo(DashboardPortfolioEventsListLoader);
