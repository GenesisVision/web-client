import "./dashboard-chart-loader.scss";

import {
  ChartLoader,
  ChartPeriodLoader
} from "components/chart/chart-loader/chart-loader";
import SvgLoader from "components/svg-loader/svg-loader";
import * as React from "react";

export const DashboardChartDescriptionLoader: React.FC = () => (
  <div className="dashboard-chart-loader__description">
    <SvgLoader height={15} width={150}>
      <rect x="0" y="0" width="150" height="15" rx="8" ry="8" />
    </SvgLoader>
  </div>
);

export const DashboardChartAssetsLoader: React.FC = () => (
  <div className="dashboard-chart-loader__assets">
    <SvgLoader height={18} width={60}>
      <rect x="0" y="0" width="60" height="18" rx="8" ry="8" />
    </SvgLoader>
  </div>
);

export const DashboardChartRequestLoader: React.FC = () => (
  <div className="dashboard-chart-loader__request dashboard-request ">
    <SvgLoader height={51} width={70}>
      <rect x="0" y="0" width="40" height="16" rx="8" ry="8" />
      <rect x="0" y="31" width="60" height="20" rx="8" ry="8" />
    </SvgLoader>
  </div>
);

export const DashboardChartLoader: React.FC = () => (
  <>
    <div className="dashboard-chart-loader__row">
      <ChartPeriodLoader className="dashboard-chart-loader__chart-period" />
      <ChartPeriodLoader className="dashboard-chart-loader__chart-period" />
    </div>
    <div className="dashboard-chart-loader__row">
      <ChartLoader className="dashboard-chart-loader__chart" />
    </div>
  </>
);
