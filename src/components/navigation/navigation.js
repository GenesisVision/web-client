import "./navigation.scss";

import classnames from "classnames";
import GVLogo from "components/gv-logo/gv-logo";
import { DashboardIcon } from "components/icon/dashboard-icon";
import { ProgramsIcon } from "components/icon/programs-icon";
import NavigationItem from "components/navigation/navigation-item";
import { HOME_ROUTE } from "pages/app/app.routes";
import { DASHBOARD_ROUTE } from "pages/dashboard/dashboard.routes";
import { PROGRAMS_ROUTE } from "pages/programs/programs.routes";
import React, { Component, Fragment } from "react";
import { translate } from "react-i18next";

class Navigation extends Component {
  state = {
    isOpen: false
  };

  render() {
    const { t, className } = this.props;
    return (
      <Fragment>
        <div className={classnames("navigation", className)}>
          <NavigationItem icon={<GVLogo />} href={HOME_ROUTE} />
          <NavigationItem
            icon={<DashboardIcon primary />}
            href={DASHBOARD_ROUTE}
          >
            {t("navigation.Dashboard")}
          </NavigationItem>
          <NavigationItem icon={<ProgramsIcon primary />} href={PROGRAMS_ROUTE}>
            {t("navigation.Programs")}
          </NavigationItem>
        </div>
      </Fragment>
    );
  }
}

export default translate()(Navigation);
