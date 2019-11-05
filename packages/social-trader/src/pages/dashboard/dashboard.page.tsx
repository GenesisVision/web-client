import "./dashboard.scss";
import "shared/components/dashboard/dashboard.scss";

import DashboardAssets from "pages/dashboard/components/dashboard-pie-chart/dashboard-assets";
import DashboardPortfolio from "pages/dashboard/components/dashboard-pie-chart/dashboard-portfolio";
import DashboardRecommendationsContainer from "pages/dashboard/components/dashboard-recommendations/dashboard-recommendations.container";
import DashboardInvestingStatistic from "pages/dashboard/components/dashboard-statistic/dashboard-investing-statistic";
import DashboardProgramsStatistic from "pages/dashboard/components/dashboard-statistic/dashboard-programs-statistic";
import DashboardTotalContainer from "pages/dashboard/components/dashboard-total/dashboard-total.container";
import React from "react";
import { useTranslation } from "react-i18next";
import Page from "shared/components/page/page";

import DashboardPortfolioChartSection from "./components/dashboard-portfolio-chart-section/dashboard-portfolio-chart-section";

const _DashboardPage: React.FC = () => {
  const [t] = useTranslation();
  return (
    <Page title={t(`social-trader.dashboard-page.title`)}>
      <div>
        <DashboardTotalContainer />
      </div>
      <div>
        <DashboardPortfolioChartSection />
      </div>
      <div className="dashboard__statistic-block">
        <DashboardProgramsStatistic />
        <DashboardInvestingStatistic />
      </div>
      <div className="dashboard__statistic-block">
        <DashboardPortfolio />
        <DashboardAssets />
      </div>
      <DashboardRecommendationsContainer />
    </Page>
  );
};

const DashboardPage = React.memo(_DashboardPage);
export default DashboardPage;
