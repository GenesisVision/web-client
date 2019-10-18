import "./dashboard-chart-block.scss";

import React from "react";
import Surface from "shared/components/surface/surface";

const _DashboardChartBlock: React.FC<Props> = ({ children }) => (
  <div className="dashboard-chart-block">
    <Surface className="dashboard-portfolio-chart-section">{children}</Surface>
  </div>
);
interface Props extends React.HTMLAttributes<HTMLDivElement> {}
export const DashboardChartBlock = React.memo(_DashboardChartBlock);
