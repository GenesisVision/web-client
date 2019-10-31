import "shared/components/dashboard/dashboard.scss";

import React from "react";
import { useTranslation } from "react-i18next";
import DetailsBlock from "shared/components/details/details-block";
import Page from "shared/components/page/page";
import useRole from "shared/hooks/use-role.hook";

import DashboardAssetsContainer from "./components/dashboard-assets/dashboard-assets-container";
import DashboardPortfolioChartSection from "./components/dashboard-portfolio-chart-section/dashboard-portfolio-chart-section";
import DashboardPortfolioEventsSection from "./components/dashboard-portfolio-events/dashboard-portfolio-events-section";

const _DashboardPage: React.FC = () => {
  const [t] = useTranslation();
  const role = useRole();
  const title = t(`${role ? `${role}.` : ""}dashboard-page.title`);
  return (
    <Page title={title}>
      <div className="dashboard__row">
        <DetailsBlock className="dashboard__chart-block">
          <DashboardPortfolioChartSection />
        </DetailsBlock>
        <DetailsBlock horizontalPaddings className="dashboard__events-block">
          <DashboardPortfolioEventsSection title={title} />
        </DetailsBlock>
      </div>
      <DetailsBlock>
        <DashboardAssetsContainer title={title} />
      </DetailsBlock>
    </Page>
  );
};

const DashboardPage = React.memo(_DashboardPage);
export default DashboardPage;
