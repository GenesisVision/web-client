import "./dashboard-chart-loader.scss";

import React from "react";
import SvgLoader from "shared/components/svg-loader/svg-loader.js";

const DashboardChartHeaderLoader = () => (
  <div className="dashboard-chart-loader__header">
    <ChartLoaderRequest />
  </div>
);

const ChartLoaderRequest = () => (
  <div className="dashboard-chart-loader__request">
    <SvgLoader
      height="50"
      width="70"
    >
      <rect x="0" y="0" width="40" height="15" rx="8" ry="8"></rect>
      <rect x="0" y="30" width="60" height="20" rx="8" ry="8"></rect>
    </SvgLoader>
  </div>
);

export default DashboardChartHeaderLoader;

