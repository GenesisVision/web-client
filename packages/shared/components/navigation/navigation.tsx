import "./navigation.scss";

import classNames from "classnames";
import { HOME_ROUTE } from "pages/app/app.routes";
import { DASHBOARD_ROUTE } from "pages/dashboard/dashboard.routes";
import { FUNDS_ROUTE } from "pages/funds/funds.routes";
import { PROGRAMS_ROUTE } from "pages/programs/programs.routes";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import GVLogo from "shared/components/gv-logo/gv-logo";
import { DashboardIcon } from "shared/components/icon/dashboard-icon";
import { FundsIcon } from "shared/components/icon/funds-icon";
import { ProgramsIcon } from "shared/components/icon/programs-icon";
import NavigationItem from "shared/components/navigation/navigation-item";

interface INavigationProps {
  className?: string;
}

interface INavigationState {
  isOpen: boolean;
}

class Navigation extends React.PureComponent<
  INavigationProps & InjectedTranslateProps,
  INavigationState
> {
  state = {
    isOpen: false
  };

  render() {
    const { t, className } = this.props;
    return (
      <React.Fragment>
        <div className={classNames("navigation", className)}>
          <NavigationItem icon={<GVLogo />} href={HOME_ROUTE} />
          <NavigationItem
            icon={<DashboardIcon primary />}
            href={DASHBOARD_ROUTE}
          >
            {t("navigation.dashboard")}
          </NavigationItem>
          <NavigationItem icon={<ProgramsIcon primary />} href={PROGRAMS_ROUTE}>
            {t("navigation.programs")}
          </NavigationItem>
          <NavigationItem icon={<FundsIcon primary />} href={FUNDS_ROUTE}>
            {t("navigation.funds")}
          </NavigationItem>
        </div>
      </React.Fragment>
    );
  }
}

export default translate()(Navigation);
