import "./navigation.scss";

import classNames from "classnames";
import * as React from "react";
import { compose } from "redux";
import GVLogo from "shared/components/gv-logo/gv-logo";
import { DashboardIcon } from "shared/components/icon/dashboard-icon";
import { FundsIcon } from "shared/components/icon/funds-icon";
import { ProgramsIcon } from "shared/components/icon/programs-icon";
import NavigationItem from "shared/components/navigation/navigation-item";
import { WithTranslation, withTranslation } from "shared/i18n";
import { HOME_ROUTE } from "shared/routes/app.routes";
import { DASHBOARD_ROUTE } from "shared/routes/dashboard.routes";
import { FUNDS_ROUTE } from "shared/routes/funds.routes";
import { PROGRAMS_ROUTE } from "shared/routes/programs.routes";

interface INavigationProps {
  className?: string;
}

const _Navigation: React.FC<INavigationProps & WithTranslation> = ({
  t,
  className
}) => (
  <>
    <div className={classNames("navigation", className)}>
      <NavigationItem icon={<GVLogo />} pathname={HOME_ROUTE} />
      <NavigationItem
        icon={<DashboardIcon primary />}
        pathname={DASHBOARD_ROUTE}
      >
        {t("navigation.dashboard")}
      </NavigationItem>
      <NavigationItem icon={<ProgramsIcon primary />} pathname={PROGRAMS_ROUTE}>
        {t("navigation.programs")}
      </NavigationItem>
      <NavigationItem icon={<FundsIcon primary />} pathname={FUNDS_ROUTE}>
        {t("navigation.funds")}
      </NavigationItem>
    </div>
  </>
);

const Navigation = compose<React.ComponentType<INavigationProps>>(
  withTranslation(),
  React.memo
)(_Navigation);
export default Navigation;
