import "./navigation.scss";

import classnames from "classnames";
import GVLogo from "components/gv-logo/gv-logo";
import { DashboardIcon, ProgramIcon } from "components/icon/icon";
import NavigationItem from "components/navigation/navigation-item";
import { HOME_ROUTE } from "pages/app/app.routes";
import { DASHBOARD_ROUTE } from "pages/dashboard/dashboard.routes";
import { PROGRAMS_ROUTE } from "pages/programs/programs.routes";
import React from "react";
import { translate } from "react-i18next";

const Navigation = ({ t, className }) => {
  return (
    <div className={classnames("navigation", className)}>
      <NavigationItem icon={<GVLogo />} href={HOME_ROUTE} />
      <NavigationItem icon={<DashboardIcon />} href={DASHBOARD_ROUTE}>
        {t("navigation.Dashboard")}
      </NavigationItem>
      <NavigationItem icon={<ProgramIcon />} href={PROGRAMS_ROUTE}>
        {t("navigation.Programs")}
      </NavigationItem>
    </div>
  );
};

export default translate()(Navigation);
