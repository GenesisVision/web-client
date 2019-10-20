import "./dashboard-portfolio-chart-section.scss";

import * as React from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  ChartDefaultPeriod,
  DEFAULT_PERIOD
} from "shared/components/chart/chart-period/chart-period.helpers";
import { currencySelector } from "shared/reducers/account-settings-reducer";
import { isNewUserSelector } from "shared/reducers/header-reducer";

import { DashboardChartValueLoaderData } from "../../dashboard.loaders-data";
import {
  dashboardPortfolioChartErrorSelector,
  dashboardPortfolioChartSelector
} from "../../reducers/dashboard-portfolio-chart.reducer";
import { getPortfolioChart } from "../../services/dashboard-chart.service";
import { getInRequests } from "../../services/dashboard-in-requests.service";
import DashboardFailChart from "./dashboard-fail-chart";
import DashboardGetStarted from "./dashboard-get-started";
import DashboardPortfolioChartSection from "./dashboard-portfolio-chart-section";
import DashboardPortfolioChartStat from "./dashboard-portfolio-chart-stat";

const _DashboardPortfolioChartSectionContainer: React.FC = () => {
  const dispatch = useDispatch();
  const portfolioChartData = useSelector(dashboardPortfolioChartSelector);
  const portfolioChartDataError = useSelector(
    dashboardPortfolioChartErrorSelector
  );
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
  if (portfolioChartDataError)
    return <DashboardFailChart errorMessage={portfolioChartDataError} />;
  return (
    <>
      <h3 className="dashboard-portfolio-chart-section__heading">
        {t("investor.dashboard-page.chart-section.header")}
      </h3>
      <DashboardPortfolioChartStat
        loaderData={DashboardChartValueLoaderData}
        data={portfolioChartData!}
        currency={currency}
      />
      <DashboardPortfolioChartSection
        loaderData={DashboardChartValueLoaderData}
        data={portfolioChartData!}
        period={period}
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
