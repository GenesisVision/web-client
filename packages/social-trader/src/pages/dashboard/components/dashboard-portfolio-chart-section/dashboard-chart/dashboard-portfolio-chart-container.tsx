import React from "react";
import { ChartDefaultPeriod } from "shared/components/chart/chart-period/chart-period.helpers";
import { IDashboardAssetChart } from "shared/constants/constants";
import { withBlurLoader } from "shared/decorators/with-blur-loader";

const _DashboardPortfolioChartContainer: React.FC<Props> = ({
  data: assetChart,
  period
}) => {
  return <></>;
};

interface Props {
  data: IDashboardAssetChart;
  period: ChartDefaultPeriod;
}

const DashboardPortfolioChartContainer = withBlurLoader(
  React.memo(_DashboardPortfolioChartContainer)
);
export default DashboardPortfolioChartContainer;
