import "shared/components/dashboard/dashboard.scss";

import CopytradingTablesSection from "modules/copytrading-tables/components/copytrading-tables-section";
import React from "react";
import { useTranslation } from "react-i18next";
import DetailsBlock from "shared/components/details/details-block";
import Page from "shared/components/page/page";
import useRole from "shared/hooks/use-role.hook";

import DashboardAssetsSection from "./components/dashboard-assets/dashboard-assets-section";
import DashboardPortfolioChartSectionContainer from "./components/dashboard-portfolio-chart-section/dashboard-portfolio-chart-section-container";
import DashboardPortfolioEventsSection from "./components/dashboard-portfolio-events/dashboard-portfolio-events-section";

const DashboardPage: React.FC = () => {
  const role = useRole();
  const [t] = useTranslation();
  const title = t(`${role ? `${role}.` : ""}dashboard-page.title`);
  return (
    <Page title={title}>
      <div className="dashboard__row">
        <DetailsBlock className="dashboard__chart-block">
          <DashboardPortfolioChartSectionContainer />
        </DetailsBlock>
        <DetailsBlock horizontalPaddings className="dashboard__events-block">
          <DashboardPortfolioEventsSection title={title} />
        </DetailsBlock>
      </div>
      <div>
        <DetailsBlock>
          <DashboardAssetsSection title={title} />
        </DetailsBlock>
      </div>
      <div>
        <DetailsBlock>
          <CopytradingTablesSection title={title} />
        </DetailsBlock>
      </div>
    </Page>
  );
};

export default React.memo(DashboardPage);
