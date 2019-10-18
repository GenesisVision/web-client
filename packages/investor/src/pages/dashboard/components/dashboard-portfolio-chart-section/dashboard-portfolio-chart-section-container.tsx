import "./dashboard-portfolio-chart-section.scss";

import * as React from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  ChartDefaultPeriod,
  DEFAULT_PERIOD
} from "shared/components/chart/chart-period/chart-period.helpers";
import {
  DashboardChartLoader,
  DashboardChartRequestLoader
} from "shared/components/dashboard/dashboard-chart-loader/dashboard-chart-loaders";
import DashboardChartStatsLoader from "shared/components/dashboard/dashboard-chart-loader/dashboard-chart-stats-loader";
import DashboardInRequestsContainer from "shared/components/dashboard/dashboard-portfolio-chart-section/dashboard-in-requests/dashboard-in-requests-container";
import { currencySelector } from "shared/reducers/account-settings-reducer";
import { isNewUserSelector } from "shared/reducers/header-reducer";

import { dashboardInRequestsSelector } from "../../reducers/dashboard-in-requests.reducer";
import { dashboardPortfolioChartSelector } from "../../reducers/dashboard-portfolio-chart.reducer";
import { getPortfolioChart } from "../../services/dashboard-chart.service";
import {
  cancelRequest,
  getInRequests
} from "../../services/dashboard-in-requests.service";
import DashboardGetStarted from "./dashboard-get-started";
import DashboardPortfolioChartSection from "./dashboard-portfolio-chart-section";
import DashboardPortfolioChartStat from "./dashboard-portfolio-chart-stat";

const _DashboardPortfolioChartSectionContainer: React.FC = () => {
  const dispatch = useDispatch();
  const portfolioChartData = useSelector(dashboardPortfolioChartSelector);
  const inRequests = useSelector(dashboardInRequestsSelector);
  const currency = useSelector(currencySelector);
  const isNewUser = useSelector(isNewUserSelector);
  const [t] = useTranslation();
  const [period, setPeriod] = useState<ChartDefaultPeriod>(DEFAULT_PERIOD);

  useEffect(() => {
    dispatch(getInRequests());
  }, []);

  useEffect(() => {
    dispatch(getPortfolioChart(period.start, period.end, currency));
  }, [currency, period]);

  if (isNewUser) return <DashboardGetStarted />;
  return (
    <>
      <h3 className="dashboard-portfolio-chart-section__heading">
        {t("investor.dashboard-page.chart-section.header")}
      </h3>
      <DashboardInRequestsContainer
        condition={!!inRequests}
        loader={<DashboardChartRequestLoader />}
        inRequests={inRequests!}
        cancelRequest={cancelRequest}
      />
      <DashboardPortfolioChartStat
        condition={!!portfolioChartData}
        loader={<DashboardChartStatsLoader />}
        currency={currency}
        portfolioChartData={portfolioChartData!}
      />
      <DashboardPortfolioChartSection
        condition={!!portfolioChartData}
        loader={<DashboardChartLoader />}
        period={period}
        data={portfolioChartData!}
        currency={currency}
        handleChangePeriod={setPeriod}
      />
    </>
  );
};

const DashboardPortfolioChartSectionContainer = React.memo(
  _DashboardPortfolioChartSectionContainer
);
export default DashboardPortfolioChartSectionContainer;
