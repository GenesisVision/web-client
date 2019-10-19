import React, { useCallback } from "react";
import { connect, ResolveThunks } from "react-redux";
import {
  ActionCreatorsMapObject,
  bindActionCreators,
  compose,
  Dispatch
} from "redux";
import ChartPeriod from "shared/components/chart/chart-period/chart-period";
import { ChartDefaultPeriod } from "shared/components/chart/chart-period/chart-period.helpers";
import FundProfitChart from "shared/components/funds/fund-details/fund-details-statistics-section/fund-details-chart-section/fund-profit-chart-section/fund-profit-chart";
import ProgramProfitChart from "shared/components/programs/program-details/program-details-statistic-section/program-details-chart-section/program-profit-chart-section/program-profit-chart";
import { ASSETS_TYPES } from "shared/components/table/components/filtering/asset-type-filter/asset-type-filter.constants";
import { IDashboardAssetChart } from "shared/constants/constants";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";

import { getAssetChart, setPeriod } from "../../../services/dashboard.service";

const _DashboardPortfolioChartContainer: React.FC<Props> = ({
  assetChart,
  period,
  service
}) => {
  const handleChangePeriod = useCallback(
    (period: ChartDefaultPeriod) => {
      service.setPeriod(period);
      service.getAssetChart(
        assetChart.id,
        assetChart.title,
        assetChart.type,
        period
      );
    },
    [service, assetChart]
  );

  return (
    <>
      <h3 className="dashboard-portfolio-chart-section__heading">
        {assetChart.title}
      </h3>
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

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    { getAssetChart, setPeriod },
    dispatch
  )
});

interface Props extends DispatchProps, OwnProps {}

interface ServiceThunks extends ActionCreatorsMapObject {
  getAssetChart: typeof getAssetChart;
  setPeriod: typeof setPeriod;
}
interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

interface OwnProps {
  assetChart: IDashboardAssetChart;
  period: ChartDefaultPeriod;
}

const DashboardPortfolioChartContainer = compose<
  React.ComponentType<OwnProps & WithLoaderProps>
>(
  withLoader,
  connect(
    null,
    mapDispatchToProps
  ),
  React.memo
)(_DashboardPortfolioChartContainer);
export default DashboardPortfolioChartContainer;
