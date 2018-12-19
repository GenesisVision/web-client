import "./dashboard-chart-loader.scss";

import React from "react";
import SvgLoader from "shared/components/svg-loader/svg-loader.js";

const DashboardChartDescriptionLoader = () => (
  <div className="dashboard-chart-loader__description">
    <SvgLoader
      height="15"
      width="200"
    >
      <rect x="0" y="0" width="200" height="15" rx="8" ry="8"></rect>
    </SvgLoader>
  </div>
);

export default DashboardChartDescriptionLoader;

