import "shared/components/details/details-description-section/details-statistic-section/details-statistic/details-statistics.scss";

import { FundProfitChart } from "gv-api-web";
import * as React from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import DetailsStatisticsLoader from "shared/components/details/details-description-section/details-statistic-section/details-loader/details-statistic-loader";
import Surface from "shared/components/surface/surface";
import { CurrencyEnum } from "shared/utils/types";

import { fundProfitChartSelector } from "../../reducers/profit-chart.reducer";
import { statisticCurrencySelector } from "../../reducers/statistic-currency.reducer";
import FundDetailsStatisticsElements from "./fund-details-statistics-elements";

const _FundDetailsStatistics: React.FC = () => {
  const [t] = useTranslation();
  const statistic = useSelector(fundProfitChartSelector);
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
      <h3>{t("fund-details-page.statistics.heading")}</h3>
      <FundDetailsStatisticsElements
        statisticData={statisticData!}
        condition={!!statisticData}
        loader={<DetailsStatisticsLoader />}
        statisticCurrency={statisticCurrency}
      />
    </Surface>
  );
};

export interface IStatisticData {
  statisticCurrency: CurrencyEnum;
  statistic: FundProfitChart;
}

const FundDetailsStatistics = React.memo(_FundDetailsStatistics);
export default FundDetailsStatistics;
