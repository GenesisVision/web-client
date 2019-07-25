import "shared/components/dashboard/dashboard.scss";

import "./dashboard.scss";

import React from "react";
import { useTranslation } from "react-i18next";
import Page from "shared/components/page/page";
import Surface from "shared/components/surface/surface";
import withRole, { WithRoleProps } from "shared/decorators/with-role";

import DashboardAssetsSection from "./components/dashboard-assets/dashboard-assets-section";
import DashboardPortfolioChartSectionContainer from "./components/dashboard-portfolio-chart-section/dashboard-portfolio-chart-section-container";
import DashboardPortfolioEventsSection from "./components/dashboard-portfolio-events/dashboard-portfolio-events-section";
import DashboardTrades from "./components/dashboard-trades/dashboard-trades";

interface IDashboardPageProps extends WithRoleProps {}

const DashboardPage: React.FC<IDashboardPageProps> = ({ role }) => {
  const [t] = useTranslation();
  const title = t(`${role}.dashboard-page.title`);
  return (
    <Page title={title}>
      <div className="dashboard">
        <div className="dashboard__row">
          <div className="dashboard__chart">
            <Surface className="dashboard-portfolio-chart-section">
              <DashboardPortfolioChartSectionContainer />
            </Surface>
          </div>
          <div className="dashboard__portfolio-events-aside">
            <DashboardPortfolioEventsSection title={title} />
          </div>
        </div>
        <div className="dashboard__table-section">
          <DashboardAssetsSection title={title} />
        </div>
        {/* <div className="dashboard__table-section">
          <DashboardTrades title={title} />
        </div> */}
      </div>
    </Page>
  );
};

export default withRole(React.memo(DashboardPage));
