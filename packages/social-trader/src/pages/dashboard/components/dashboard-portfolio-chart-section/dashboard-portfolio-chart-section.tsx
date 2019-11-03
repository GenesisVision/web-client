import "./dashboard-portfolio-chart-section.scss";

import * as React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  ChartDefaultPeriod,
  DEFAULT_PERIOD
} from "shared/components/chart/chart-period/chart-period.helpers";
import MultiChartContainer from "shared/components/multi-chart/multi-chart.container";
import { isNewUserSelector } from "shared/reducers/header-reducer";

import DashboardGetStarted from "./dashboard-get-started";

const _DashboardPortfolioChartSection: React.FC = () => {
  const [period, setPeriod] = useState<ChartDefaultPeriod>(DEFAULT_PERIOD);
  const isNewUser = useSelector(isNewUserSelector);

  if (isNewUser) return <DashboardGetStarted />;
  return (
    <>
      <div className="dashboard-portfolio-chart-section__actions">
        <h3 className="dashboard-portfolio-chart-section__heading">
          {"Chart"}
        </h3>
      </div>
      <MultiChartContainer period={period} handleChangePeriod={setPeriod} />
    </>
  );
};

const DashboardPortfolioChartSection = React.memo(
  _DashboardPortfolioChartSection
);
export default DashboardPortfolioChartSection;
