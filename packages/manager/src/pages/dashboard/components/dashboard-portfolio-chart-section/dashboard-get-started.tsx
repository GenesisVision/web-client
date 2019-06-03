import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { Link } from "react-router-dom";
import { compose } from "redux";
import GVButton from "shared/components/gv-button";
import Surface from "shared/components/surface/surface";
import { WALLET_TOTAL_PAGE_ROUTE } from "shared/components/wallet/wallet.routes";
import withRole, { WithRoleProps } from "shared/decorators/withRole";

const _DashboardGetStarted: React.FC<
  InjectedTranslateProps & WithRoleProps
> = ({ role, t }) => (
  <Surface className="dashboard-portfolio-chart-section">
    <div className="get-started">
      <h1>{t(`${role}.dashboard-page.get-started.title`)}</h1>
      <div className="get-started__text">
        <div>{t(`${role}.dashboard-page.get-started.text-1`)}</div>
        <div>{t(`${role}.dashboard-page.get-started.text-2`)}</div>
      </div>
      <div className="get-started__deposit">
        <Link to={WALLET_TOTAL_PAGE_ROUTE}>
          <GVButton
            id="signUpFormSubmit"
            className="invest-form__submit-button"
          >
            {t(`${role}.dashboard-page.get-started.deposit`)}
          </GVButton>
        </Link>
      </div>
    </div>
  </Surface>
);

const DashboardGetStarted = compose<React.ComponentType>(
  React.memo,
  withRole,
  translate()
)(_DashboardGetStarted);
export default DashboardGetStarted;
