import "./navigation.scss";

import classNames from "classnames";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { FUNDS_ROUTE } from "shared/components/funds/funds.routes";
import GVLogo from "shared/components/gv-logo/gv-logo";
import { DashboardIcon } from "shared/components/icon/dashboard-icon";
import { FundsIcon } from "shared/components/icon/funds-icon";
import { ProgramsIcon } from "shared/components/icon/programs-icon";
import NavigationItem from "shared/components/navigation/navigation-item";
import { HOME_ROUTE } from "shared/routes/app.routes";
import { DASHBOARD_ROUTE } from "shared/routes/dashboard.routes";
import { PROGRAMS_ROUTE } from "shared/routes/programs.routes";

interface INavigationProps {
  className?: string;
}

const _Navigation: React.FC<INavigationProps & InjectedTranslateProps> = ({
  t,
  className
}) => (
  <>
    <div className={classNames("navigation", className)}>
      <NavigationItem icon={<GVLogo />} href={HOME_ROUTE} />
      <NavigationItem icon={<DashboardIcon primary />} href={DASHBOARD_ROUTE}>
        {t("navigation.dashboard")}
      </NavigationItem>
      <NavigationItem icon={<ProgramsIcon primary />} href={PROGRAMS_ROUTE}>
        {t("navigation.programs")}
      </NavigationItem>
      <NavigationItem icon={<FundsIcon primary />} href={FUNDS_ROUTE}>
        {t("navigation.funds")}
      </NavigationItem>
    </div>
  </>
);

const Navigation = translate()(_Navigation);
export default Navigation;
