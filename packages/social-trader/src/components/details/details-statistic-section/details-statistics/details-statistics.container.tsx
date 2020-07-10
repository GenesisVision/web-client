import { ChartDefaultPeriod } from "components/chart/chart-period/chart-period.helpers";
import DetailsStatistics from "components/details/details-statistic-section/details-statistics/details-statistics";
import {
  StatisticDataType,
  TProfitChartSelector,
  TStatisticCurrencySelector,
  TUseChartPeriod
} from "components/details/details-statistic-section/details.chart.types";
import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CurrencyEnum } from "utils/types";

const _DetailsStatisticsContainer: React.FC<IDetailsStatisticsProps> = ({
  profitChartSelector,
  statisticCurrencySelector,
  renderDetailsStatisticsElements,
  useChartPeriod
}) => {
  const { period } = useChartPeriod();
  const profitChart = useSelector(profitChartSelector);
  const statisticCurrency = useSelector(statisticCurrencySelector);
  const [statisticData, setStatisticData] = useState<
    IStatisticData | undefined
  >(undefined);
  useEffect(() => {
    if (!profitChart) return;
    const { statistic } = profitChart;
    statistic && setStatisticData({ statisticCurrency, statistic });
  }, [profitChart, statisticCurrency]);
  return (
    <DetailsStatistics
      period={period}
      statisticData={statisticData}
      renderDetailsStatisticsElements={renderDetailsStatisticsElements}
    />
  );
};

export interface IStatisticData {
  statisticCurrency: CurrencyEnum;
  statistic: StatisticDataType;
}

export type TRenderDetailsStatisticsElementsProps = {
  period: ChartDefaultPeriod;
  statisticData?: IStatisticData;
};
export type TRenderDetailsStatisticsElements = (
  props: TRenderDetailsStatisticsElementsProps
) => JSX.Element;

export interface IDetailsStatisticsProps {
  profitChartSelector: TProfitChartSelector;
  statisticCurrencySelector: TStatisticCurrencySelector;
  useChartPeriod: TUseChartPeriod;
  renderDetailsStatisticsElements: TRenderDetailsStatisticsElements;
}

const DetailsStatisticsContainer = React.memo(_DetailsStatisticsContainer);
export default DetailsStatisticsContainer;
