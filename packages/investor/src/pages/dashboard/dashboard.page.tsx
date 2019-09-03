import "shared/components/dashboard/dashboard.scss";
import "./dashboard.scss";

import CopytradingTablesSection from "modules/copytrading-tables/components/copytrading-tables-section";
import React from "react";
import { useTranslation } from "react-i18next";
import Page from "shared/components/page/page";
import Surface from "shared/components/surface/surface";
import useRole from "shared/hooks/use-role.hook";

import DashboardAssetsSection from "./components/dashboard-assets/dashboard-assets-section";
import DashboardPortfolioChartSectionContainer from "./components/dashboard-portfolio-chart-section/dashboard-portfolio-chart-section-container";
import DashboardPortfolioEventsSection from "./components/dashboard-portfolio-events/dashboard-portfolio-events-section";

const DashboardPage: React.FC = () => {
  const role = useRole();
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
        <div className="dashboard__table-section">
          <CopytradingTablesSection title={title} />
        </div>
      </div>
    </Page>
  );
};

export default React.memo(DashboardPage);
