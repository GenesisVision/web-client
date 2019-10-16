import "shared/components/dashboard/dashboard.scss";

import * as React from "react";
import { useTranslation } from "react-i18next";
import Page from "shared/components/page/page";
import useRole from "shared/hooks/use-role.hook";

import DashboardAssetsContainer from "./components/dashboard-assets/dashboard-assets-container";
import DashboardPortfolioChartSection from "./components/dashboard-portfolio-chart-section/dashboard-portfolio-chart-section";
import DashboardPortfolioEventsSection from "./components/dashboard-portfolio-events/dashboard-portfolio-events-section";

const _DashboardPage: React.FC = () => {
  const [t] = useTranslation();
  const role = useRole();
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

const DashboardPage = React.memo(_DashboardPage);
export default DashboardPage;
