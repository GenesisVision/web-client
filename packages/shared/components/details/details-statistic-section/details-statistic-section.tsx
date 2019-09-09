import "shared/components/details/details-description-section/details-statistic-section/details-statistic-section.scss";

import * as React from "react";

import DetailsChart, {
  IDetailsChartProps
} from "./details-chart-section/details-chart";
import DetailsStatistics, {
  IDetailsStatisticsProps
} from "./details-statistics/details-statistics";

const _DetailsStatisticSection: React.FC<Props> = ({
  useChartStateValues,
  balanceChartSelector,
  renderBalanceChart,
  renderProfitChart,
  profitValue,
  profitChartSelector,
  statisticCurrencySelector,
  useChartPeriod,
  renderDetailsStatisticsElements
}) => (
  <div className="details-statistic-section">
    <div className="details-statistic-section__statistic">
      <DetailsStatistics
        profitChartSelector={profitChartSelector}
        statisticCurrencySelector={statisticCurrencySelector}
        useChartPeriod={useChartPeriod}
        renderDetailsStatisticsElements={renderDetailsStatisticsElements}
      />
    </div>
    <div className="details-statistic-section__chart">
      <DetailsChart
        useChartStateValues={useChartStateValues}
        useChartPeriod={useChartPeriod}
        balanceChartSelector={balanceChartSelector}
        renderBalanceChart={renderBalanceChart}
        renderProfitChart={renderProfitChart}
        profitChartSelector={profitChartSelector}
        profitValue={profitValue}
      />
    </div>
  </div>
);

interface Props extends IDetailsStatisticsProps, IDetailsChartProps {}

const DetailsStatisticSection = React.memo(_DetailsStatisticSection);
export default DetailsStatisticSection;
