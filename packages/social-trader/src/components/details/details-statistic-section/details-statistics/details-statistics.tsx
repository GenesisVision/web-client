import "components/details/details-description-section/details-statistic-section/details-statistic/details-statistics.scss";

import { ChartDefaultPeriod } from "components/chart/chart-period/chart-period.helpers";
import DetailsBlock from "components/details/details-block";
import {
  StatisticDataType,
  TProfitChartSelector,
  TStatisticCurrencySelector,
  TUseChartPeriod
} from "components/details/details-statistic-section/details.chart.types";
import * as React from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { CurrencyEnum } from "utils/types";

const _DetailsStatistics: React.FC<IDetailsStatisticsProps> = ({
  profitChartSelector,
  statisticCurrencySelector,
  renderDetailsStatisticsElements,
  useChartPeriod
}) => {
  const { period } = useChartPeriod();
  const [t] = useTranslation();
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
    <DetailsBlock horizontalPaddings className="details-statistics">
      <h3>{t("details-page.statistics.heading")}</h3>
      {renderDetailsStatisticsElements({
        period,
        statisticData
      })}
    </DetailsBlock>
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

const DetailsStatistics = React.memo(_DetailsStatistics);
export default DetailsStatistics;
