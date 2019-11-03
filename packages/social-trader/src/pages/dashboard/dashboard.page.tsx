import "shared/components/dashboard/dashboard.scss";

import React from "react";
import { useTranslation } from "react-i18next";
import DetailsBlock from "shared/components/details/details-block";
import Page from "shared/components/page/page";

import DashboardPortfolioChartSection from "./components/dashboard-portfolio-chart-section/dashboard-portfolio-chart-section";

const _DashboardPage: React.FC = () => {
  const [t] = useTranslation();
  return (
    <Page title={t(`social-trader.dashboard-page.title`)}>
      <DetailsBlock className="dashboard__chart-block">
        <DashboardPortfolioChartSection />
      </DetailsBlock>
    </Page>
  );
};

const DashboardPage = React.memo(_DashboardPage);
export default DashboardPage;
