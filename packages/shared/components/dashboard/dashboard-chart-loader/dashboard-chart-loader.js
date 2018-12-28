import "./dashboard-chart-loader.scss";

import React, { Fragment } from "react";
import SvgLoader from "shared/components/svg-loader/svg-loader";

const DashboardChartLoader = () => {
  return (
    <Fragment>
      <div className="dashboard-chart-loader__row">
        <ChartPeriodLoader />
        <ChartPeriodLoader />
      </div>
      <div className="dashboard-chart-loader__row">
        <ChartLoader />
      </div>
    </Fragment>
  );
};

const ChartLoader = () => (
  <div className="dashboard-chart-loader__chart">
    <SvgLoader height="351" width="1011">
      <path d="M-139.031401,357.429319 C-46.384058,357.429319 -46.384058,357.429319 46.263285,357.429319 C138.910628,357.429319 138.910628,357.429319 231.557971,357.429319 C324.205314,357.429319 324.205314,357.429319 416.852657,357.429319 C509.5,357.429319 509.5,357.429319 602.147343,357.429319 C694.794686,357.429319 694.794686,357.429319 787.442029,357.429319 C880.089372,357.429319 880.089372,357.429319 972.736715,357.429319 C1065.38406,357.429319 1065.38406,357.429319 1158.0314,357.429319 L1158.0314,315.257801 C1065.38406,315.257801 1065.38406,184.057522 972.736715,184.057522 C880.089372,184.057522 880.089372,6 787.442029,6 C694.794686,6 694.794686,137.200279 602.147343,137.200279 C509.5,137.200279 509.5,141.886003 416.852657,141.886003 C324.205314,141.886003 324.205314,104.400209 231.557971,104.400209 C138.910628,104.400209 138.910628,287.143455 46.263285,287.143455 C-46.384058,287.143455 -46.384058,348.057871 -139.031401,348.057871 L-139.031401,357.429319 Z" />
    </SvgLoader>
  </div>
);

const ChartPeriodLoader = () => (
  <div className="dashboard-chart-loader__chart-period">
    <SvgLoader height="18" width="210">
      <rect x="0" y="0" width="210" height="18" rx="8" ry="8" />
    </SvgLoader>
  </div>
);

export default DashboardChartLoader;
