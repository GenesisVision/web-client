import "./navigation.scss";

import classnames from "classnames";
import { DashboardIcon, ProgramIcon } from "components/icon/icon";
import NavigationItem from "components/navigation/navigation-item";
import { DASHBOARD_ROUTE } from "pages/dashboard/dashboard.constants";
import { PROGRAMS_ROUTE } from "pages/programs/programs.constants";
import React from "react";

const Navigation = ({ className }) => {
  return (
    <div className={classnames("navigation", className)}>
      <NavigationItem icon={<ProgramIcon />} href={PROGRAMS_ROUTE}>
        Programs
      </NavigationItem>
      <NavigationItem icon={<DashboardIcon />} href={DASHBOARD_ROUTE}>
        Dashboard
      </NavigationItem>
    </div>
  );
};

export default Navigation;
