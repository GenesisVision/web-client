import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import ChartPeriod from "shared/components/chart/chart-period/chart-period";
import { ChartDefaultPeriod } from "shared/components/chart/chart-period/chart-period.helpers";
import FundProfitChart from "shared/components/funds/fund-details/fund-details-statistics-section/fund-details-chart-section/fund-profit-chart-section/fund-profit-chart";
import ProgramProfitChart from "shared/components/programs/program-details/program-details-statistic-section/program-details-chart-section/program-profit-chart-section/program-profit-chart";
import { ASSETS_TYPES } from "shared/components/table/components/filtering/asset-type-filter/asset-type-filter.constants";
import { IDashboardAssetChart } from "shared/constants/constants";
import { withBlurLoader } from "shared/decorators/with-blur-loader";

import { getAssetChart, setPeriod } from "../../../services/dashboard.service";

const _DashboardPortfolioChartContainer: React.FC<Props> = ({
  data: assetChart,
  period
}) => {
  const dispatch = useDispatch();
  const handleChangePeriod = useCallback(
    (period: ChartDefaultPeriod) => {
      dispatch(setPeriod(period));
      dispatch(
        getAssetChart(assetChart.id, assetChart.title, assetChart.type, period)
      );
    },
    [assetChart]
  );

  return (
    <>
      <ChartPeriod period={period} onChange={handleChangePeriod} />
      <div className="dashboard-portfolio-chart-section__chart">
        {assetChart.type === ASSETS_TYPES.Program && (
          <ProgramProfitChart
            profitChart={[assetChart]}
            chartCurrencies={[{ name: assetChart.currency!, color: "#16B9AD" }]}
          />
        )}
        {assetChart.type === ASSETS_TYPES.Fund && (
          <FundProfitChart
            profitChart={[assetChart]}
            chartCurrencies={[{ name: assetChart.currency!, color: "#16B9AD" }]}
          />
        )}
      </div>
    </>
  );
};

interface Props {
  data: IDashboardAssetChart;
  period: ChartDefaultPeriod;
}

const DashboardPortfolioChartContainer = withBlurLoader(
  React.memo(_DashboardPortfolioChartContainer)
);
export default DashboardPortfolioChartContainer;
