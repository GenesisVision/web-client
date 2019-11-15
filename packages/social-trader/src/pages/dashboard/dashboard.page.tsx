import "./dashboard.scss";
import "shared/components/dashboard/dashboard.scss";

import DashboardAssets from "pages/dashboard/components/dashboard-pie-chart/dashboard-assets";
import DashboardPortfolio from "pages/dashboard/components/dashboard-pie-chart/dashboard-portfolio";
import DashboardPortfolioChartSection from "pages/dashboard/components/dashboard-portfolio-chart-section/dashboard-portfolio-chart-section";
import DashboardRecommendationsContainer from "pages/dashboard/components/dashboard-recommendations/dashboard-recommendations.container";
import DashboardInvestingStatistic from "pages/dashboard/components/dashboard-statistic/dashboard-investing-statistic";
import DashboardTotalContainer from "pages/dashboard/components/dashboard-total/dashboard-total.container";
import { TitleContext } from "pages/dashboard/dashboard.constants";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Page from "shared/components/page/page";
import { isNewUserSelector } from "shared/reducers/header-reducer";

import DashboardTradingStatistic from "./components/dashboard-statistic/dashboard-trading-statistic";

const _DashboardPage: React.FC = () => {
  const [t] = useTranslation();
  const title = t(`dashboard-page.title`);
  const notNewUser = !useSelector(isNewUserSelector);
  return (
    <TitleContext.Provider value={title}>
      <Page title={title}>
        <div>
          <DashboardTotalContainer />
        </div>
        <div className="dashboard__statistic-block">
          <DashboardTradingStatistic />
          <DashboardInvestingStatistic />
        </div>
        {notNewUser && (
          <div className="dashboard__statistic-block">
            <DashboardPortfolio />
            <DashboardAssets />
          </div>
        )}
        <DashboardRecommendationsContainer />
      </Page>
    </TitleContext.Provider>
  );
};

const DashboardPage = React.memo(_DashboardPage);
export default DashboardPage;
