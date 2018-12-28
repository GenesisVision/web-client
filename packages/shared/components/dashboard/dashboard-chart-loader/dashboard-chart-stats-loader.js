import "./dashboard-chart-loader.scss";

import React from "react";
import SvgLoader from "shared/components/svg-loader/svg-loader";

const DashboardChartStatsLoader = () => {
  return (
    <div className="dashboard-chart-loader__row dashboard-chart-loader__row--stats">
      <ChartLoaderStat />
      <ChartLoaderStat />
    </div>
  );
};

const ChartLoaderStat = () => (
  <div className="dashboard-chart-loader__stat">
    <SvgLoader height="74" width="220">
      <rect x="0" y="0" width="40" height="15" rx="8" ry="8" />
      <rect x="0" y="28" width="200" height="20" rx="8" ry="8" />
      <rect x="0" y="58" width="100" height="15" rx="8" ry="8" />
    </SvgLoader>
  </div>
);

export default DashboardChartStatsLoader;
