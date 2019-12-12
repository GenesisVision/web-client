import "./dashboard-block.scss";

import React from "react";

const _DashboardHorizontalList: React.FC<
  React.HTMLAttributes<HTMLDivElement>
> = ({ children }) => {
  return <div className="dashboard-horizontal-list">{children}</div>;
};

const DashboardHorizontalList = React.memo(_DashboardHorizontalList);
export default DashboardHorizontalList;
