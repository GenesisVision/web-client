import "./dashboard-portfolio-chart-section.scss";

import DashboardBlock from "pages/dashboard/components/dashboard-block/dashboard-block";
import * as React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import {
  ChartDefaultPeriod,
  DEFAULT_PERIOD
} from "shared/components/chart/chart-period/chart-period.helpers";
import MultiChartContainer from "shared/components/multi-chart/multi-chart.container";
import { isNewUserSelector } from "shared/reducers/header-reducer";

import DashboardGetStarted from "./dashboard-get-started";

const _DashboardPortfolioChartSection: React.FC = () => {
  const [t] = useTranslation();
  const [period, setPeriod] = useState<ChartDefaultPeriod>(DEFAULT_PERIOD);
  const isNewUser = useSelector(isNewUserSelector);

  if (isNewUser) return <DashboardGetStarted />;
  return (
    <DashboardBlock label={t("dashboard-page.chart")} all={""}>
      <MultiChartContainer period={period} handleChangePeriod={setPeriod} />
    </DashboardBlock>
  );
};

const DashboardPortfolioChartSection = React.memo(
  _DashboardPortfolioChartSection
);
export default DashboardPortfolioChartSection;
