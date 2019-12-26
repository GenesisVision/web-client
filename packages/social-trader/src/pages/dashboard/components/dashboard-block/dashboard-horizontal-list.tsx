import "./dashboard-block.scss";

import classNames from "classnames";
import React from "react";

const _DashboardHorizontalList: React.FC<
  { darkShadow?: boolean } & React.HTMLAttributes<HTMLDivElement>
> = ({ children, darkShadow }) => {
  return (
    <div
      className={classNames("dashboard-horizontal-list__shadow-wrapper", {
        "dashboard-horizontal-list__shadow-wrapper--dark-shadow": darkShadow
      })}
    >
      <div className="dashboard-horizontal-list">{children}</div>
    </div>
  );
};

const DashboardHorizontalList = React.memo(_DashboardHorizontalList);
export default DashboardHorizontalList;
