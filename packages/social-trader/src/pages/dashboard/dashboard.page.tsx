import "./dashboard.scss";

import { TitleContext } from "components/link/link.helper";
import Page from "components/page/page";
import useApiRequest from "hooks/api-request.hook";
import DashboardAssets from "pages/dashboard/components/dashboard-pie-chart/dashboard-assets";
import DashboardPortfolio from "pages/dashboard/components/dashboard-pie-chart/dashboard-portfolio";
import DashboardRecommendationsContainer from "pages/dashboard/components/dashboard-recommendations/dashboard-recommendations.container";
import DashboardInvestingStatistic from "pages/dashboard/components/dashboard-statistic/dashboard-investing-statistic";
import DashboardTotalContainer from "pages/dashboard/components/dashboard-total/dashboard-total.container";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { isNewUserSelector } from "reducers/header-reducer";

import DashboardInRequestsContainer from "./components/dashboard-in-requests/dashboard-in-requests.container";
import DashboardTradingStatistic from "./components/dashboard-statistic/dashboard-trading-statistic";
import { getRequestsCount } from "./services/dashboard.service";

const _DashboardPage: React.FC = () => {
  const { data: requestCount } = useApiRequest({
    request: getRequestsCount,
    fetchOnMount: true
  });
  const [t] = useTranslation();
  const title = t(`dashboard-page.title`);
  const notNewUser = !useSelector(isNewUserSelector);
  return (
    <TitleContext.Provider value={title}>
      <Page title={title}>
        <div>
          <DashboardTotalContainer label={t("dashboard-page.total.title")} />
        </div>
        {!!requestCount && requestCount > 0 && (
          <div>
            <DashboardInRequestsContainer />
          </div>
        )}
        <div className="dashboard__statistic-block dashboard__statistic-block--landscape-tablet">
          <DashboardTradingStatistic landscapeTablet />
          <DashboardInvestingStatistic landscapeTablet />
        </div>
        {notNewUser && (
          <div className="dashboard__statistic-block dashboard__statistic-block--tablet">
            <DashboardPortfolio tablet />
            <DashboardAssets tablet />
          </div>
        )}
        <DashboardRecommendationsContainer />
      </Page>
    </TitleContext.Provider>
  );
};

const DashboardPage = React.memo(_DashboardPage);
export default DashboardPage;
