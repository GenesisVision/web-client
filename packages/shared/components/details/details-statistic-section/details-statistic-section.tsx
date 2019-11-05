import "shared/components/details/details-description-section/details-statistic-section/details-statistic-section.scss";

import * as React from "react";

import DetailsChart, {
  DETAILS_CHART_TABS,
  IDetailsChartProps
} from "./details-chart-section/details-chart";
import DetailsStatistics, {
  IDetailsStatisticsProps
} from "./details-statistics/details-statistics";

const _DetailsStatisticSection: React.FC<Props> = ({
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
}) => {
  const data = useChartStateValues(DETAILS_CHART_TABS.PROFIT);
  return (
    <div className="details-statistic-section">
      <DetailsStatistics
        profitChartSelector={profitChartSelector}
        statisticCurrencySelector={statisticCurrencySelector}
        useChartPeriod={useChartPeriod}
        renderDetailsStatisticsElements={renderDetailsStatisticsElements}
      />
      {/*<DetailsChart*/}
      {/*  loaderData={loaderData}*/}
      {/*  useChartStateValues={useChartStateValues}*/}
      {/*  useChartPeriod={useChartPeriod}*/}
      {/*  balanceChartSelector={balanceChartSelector}*/}
      {/*  renderBalanceChart={renderBalanceChart}*/}
      {/*  renderProfitChart={renderProfitChart}*/}
      {/*  profitChartSelector={profitChartSelector}*/}
      {/*  renderProfitValue={renderProfitValue}*/}
      {/*/>*/}
    </div>
  );
};

interface Props extends IDetailsStatisticsProps, IDetailsChartProps {}

const DetailsStatisticSection = React.memo(_DetailsStatisticSection);
export default DetailsStatisticSection;
