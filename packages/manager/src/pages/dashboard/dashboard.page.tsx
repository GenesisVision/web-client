import "shared/components/dashboard/dashboard.scss";

import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import Page from "shared/components/page/page";
import withRole, { WithRoleProps } from "shared/decorators/with-role";

import DashboardAssetsContainer from "./components/dashboard-assets/dashboard-assets-container";
import DashboardPortfolioChartSection from "./components/dashboard-portfolio-chart-section/dashboard-portfolio-chart-section";
import DashboardPortfolioEventsSection from "./components/dashboard-portfolio-events/dashboard-portfolio-events-section";

const _DashboardPage: React.FC<WithTranslation & WithRoleProps> = ({
  role,
  t
}) => {
  const title = t(`${role}.dashboard-page.title`);
  return (
    <Page title={title}>
      <div className="dashboard">
        <div className="dashboard__row">
          <div className="dashboard__chart">
            <DashboardPortfolioChartSection />
          </div>
          <div className="dashboard__portfolio-events-aside">
            <DashboardPortfolioEventsSection title={title} />
          </div>
        </div>
        <div className="dashboard__assets">
          <DashboardAssetsContainer title={title} />
        </div>
      </div>
    </Page>
  );
};

const DashboardPage = compose<React.ComponentType>(
  withRole,
  translate(),
  React.memo
)(_DashboardPage);
export default DashboardPage;
