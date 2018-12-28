import "./details-chart-loader.scss";

import React from "react";
import {
  ChartLoader,
  ChartPeriodLoader
} from "shared/components/chart/chart-loader/chart-loader";
import SvgLoader from "shared/components/svg-loader/svg-loader";

const DetailsChartTabsLoader = () => (
  <div className="details-chart-loader__tabs">
    <SvgLoader height="20" width="160">
      <rect x="0" y="0" width="70" height="18" rx="8" ry="8" />
      <rect x="90" y="0" width="70" height="18" rx="8" ry="8" />
    </SvgLoader>
  </div>
);

const DetailsChartValueLoader = () => (
  <div className="details-chart-loader__value">
    <SvgLoader height="51" width="70">
      <rect x="0" y="0" width="40" height="16" rx="8" ry="8" />
      <rect x="0" y="31" width="60" height="20" rx="8" ry="8" />
    </SvgLoader>
  </div>
);

const DetailsChartLoader = () => {
  return (
    <div className="details-chart-loader">
      <div className="details-chart-loader__row">
        <DetailsChartTabsLoader />
      </div>
      <div className="details-chart-loader__row">
        <DetailsChartValueLoader />
      </div>
      <div className="details-chart-loader__row">
        <ChartPeriodLoader className="details-chart-loader__period" />
        <ChartPeriodLoader className="details-chart-loader__period" />
      </div>
      <div className="details-chart-loader__row">
        <ChartLoader className="details-chart-loader__chart" />
      </div>
    </div>
  );
};

export default DetailsChartLoader;
