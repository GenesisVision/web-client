import "./dashboard-chart-loader.scss";

import React, { Fragment } from "react";
import {
  ChartLoader,
  ChartPeriodLoader
} from "shared/components/chart/chart-loader/chart-loader";
import SvgLoader from "shared/components/svg-loader/svg-loader";

export const DashboardChartDescriptionLoader = () => (
  <div className="dashboard-chart-loader__description">
    <SvgLoader height="15" width="150">
      <rect x="0" y="0" width="150" height="15" rx="8" ry="8" />
    </SvgLoader>
  </div>
);

export const DashboardChartAssetsLoader = () => (
  <div className="dashboard-chart-loader__assets">
    <SvgLoader height="18" width="60">
      <rect x="0" y="0" width="60" height="18" rx="8" ry="8" />
    </SvgLoader>
  </div>
);

export const DashboardChartRequestLoader = () => (
  <div className="dashboard-chart-loader__request">
    <SvgLoader height="51" width="70">
      <rect x="0" y="0" width="40" height="16" rx="8" ry="8" />
      <rect x="0" y="31" width="60" height="20" rx="8" ry="8" />
    </SvgLoader>
  </div>
);

export const DashboardChartLoader = () => {
  return (
    <Fragment>
      <div className="dashboard-chart-loader__row">
        <ChartPeriodLoader className="dashboard-chart-loader__chart-period" />
        <ChartPeriodLoader className="dashboard-chart-loader__chart-period" />
      </div>
      <div className="dashboard-chart-loader__row">
        <ChartLoader className="dashboard-chart-loader__chart" />
      </div>
    </Fragment>
  );
};
