import "shared/components/details/details-description-section/details-statistic-section/details-statistic/details-statistics.scss";

import { FundProfitChart, ProgramProfitChart } from "gv-api-web";
import * as React from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { ChartDefaultPeriod } from "shared/components/chart/chart-period/chart-period.helpers";
import Surface from "shared/components/surface/surface";
import { CurrencyEnum } from "shared/utils/types";

import { TProfitChartSelector, TStatisticCurrencySelector, TUseChartPeriod } from "../details.chart.helpers";

const _DetailsStatistics: React.FC<IDetailsStatisticsProps> = ({
  profitChartSelector,
  statisticCurrencySelector,
  renderDetailsStatisticsElements,
  useChartPeriod
}) => {
  const { period } = useChartPeriod();
  const [t] = useTranslation();
  const statistic = useSelector(profitChartSelector);
  const statisticCurrency = useSelector(statisticCurrencySelector);
  const [statisticData, setStatisticData] = useState<
    IStatisticData | undefined
  >(undefined);
  useEffect(
    () => {
      statistic &&
        statistic[0] &&
        setStatisticData({ statisticCurrency, statistic: statistic[0] });
    },
    [statistic, statisticCurrency]
  );
  return (
    <Surface className="surface--horizontal-paddings details-statistics">
      <h3>{t("-details-page.statistics.heading")}</h3>
      {renderDetailsStatisticsElements({
        period,
        statisticCurrency,
        statisticData
      })}
    </Surface>
  );
};

export interface IStatisticData {
  statisticCurrency: CurrencyEnum;
  statistic: FundProfitChart | ProgramProfitChart;
}

export type TRenderDetailsStatisticsElements = (
  props: {
    period: ChartDefaultPeriod;
    statisticData?: IStatisticData;
    statisticCurrency: CurrencyEnum;
  }
) => JSX.Element;

export interface IDetailsStatisticsProps {
  profitChartSelector: TProfitChartSelector;
  statisticCurrencySelector: TStatisticCurrencySelector;
  useChartPeriod: TUseChartPeriod;
  renderDetailsStatisticsElements: TRenderDetailsStatisticsElements;
}

const DetailsStatistics = React.memo(_DetailsStatistics);
export default DetailsStatistics;
