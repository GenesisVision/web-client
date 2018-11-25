import React, { Fragment } from "react";

import PortfolioEventLoader from "./dashboard-portfolio-event-loader";

const PortfolioEventsListLoader = ({ hidden }) =>
  !hidden && (
    <Fragment>
      <PortfolioEventLoader />
      <PortfolioEventLoader />
      <PortfolioEventLoader />
    </Fragment>
  );

export default PortfolioEventsListLoader;
