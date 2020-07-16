import * as React from "react";

import DetailsChart, {
  IDetailsChartProps
} from "./details-chart-section/details-chart";
import styles from "./details-statistic-section.module.scss";
import DetailsStatisticsContainer, {
  IDetailsStatisticsProps
} from "./details-statistics/details-statistics.container";

const _DetailsStatisticSection: React.FC<Props> = ({
  renderAbsoluteProfitChart,
  absoluteProfitChartSelector,
  loaderData,
  useChartStateValues,
  balanceChartSelector,
  renderBalanceChart,
  renderProfitChart,
  renderProfitValue,
  profitChartSelector,
  statisticCurrencySelector,
  useChartPeriod,
  renderDetailsStatisticsElements
}) => (
  <div className={styles["details-statistic-section"]}>
    <DetailsStatisticsContainer
      profitChartSelector={profitChartSelector}
      statisticCurrencySelector={statisticCurrencySelector}
      useChartPeriod={useChartPeriod}
      renderDetailsStatisticsElements={renderDetailsStatisticsElements}
    />
    <DetailsChart
      renderAbsoluteProfitChart={renderAbsoluteProfitChart}
      absoluteProfitChartSelector={absoluteProfitChartSelector}
      loaderData={loaderData}
      useChartStateValues={useChartStateValues}
      useChartPeriod={useChartPeriod}
      balanceChartSelector={balanceChartSelector}
      renderBalanceChart={renderBalanceChart}
      renderProfitChart={renderProfitChart}
      profitChartSelector={profitChartSelector}
      renderProfitValue={renderProfitValue}
    />
  </div>
);

interface Props extends IDetailsStatisticsProps, IDetailsChartProps {}

const DetailsStatisticSection = React.memo(_DetailsStatisticSection);
export default DetailsStatisticSection;
