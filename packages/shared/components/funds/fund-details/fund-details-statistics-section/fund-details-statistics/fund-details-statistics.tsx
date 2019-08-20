import "shared/components/details/details-description-section/details-statistic-section/details-statistic/details-statistics.scss";

import { FundProfitChart } from "gv-api-web";
import * as React from "react";
import { useEffect, useState } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { ChartDefaultPeriod } from "shared/components/chart/chart-period/chart-period.helpers";
import DetailsStatisticsLoader from "shared/components/details/details-description-section/details-statistic-section/details-loader/details-statistic-loader";
import Surface from "shared/components/surface/surface";
import { CurrencyEnum } from "shared/utils/types";

import FundDetailsStatisticsElements from "./fund-details-statistics-elements";

const _FundDetailsStatistics: React.FC<Props> = ({
  statisticCurrency,
  t,
  statistic,
  period
}) => {
  const [statisticData, setStatisticData] = useState<
    IStatisticData | undefined
  >(undefined);
  useEffect(
    () => {
      statistic && setStatisticData({ statisticCurrency, statistic });
    },
    [statistic]
  );
  return (
    <Surface className="surface--horizontal-paddings details-statistics">
      <h3>{t("fund-details-page.statistics.heading")}</h3>
      <FundDetailsStatisticsElements
        statisticData={statisticData!}
        condition={!!statisticData}
        loader={<DetailsStatisticsLoader />}
        statisticCurrency={statisticCurrency}
        statistic={statistic!}
        period={period}
      />
    </Surface>
  );
};

export interface IStatisticData {
  statisticCurrency: CurrencyEnum;
  statistic: FundProfitChart;
}

interface Props extends WithTranslation {
  statisticCurrency: CurrencyEnum;
  period: ChartDefaultPeriod;
  statistic?: FundProfitChart;
}

const FundDetailsStatistics = translate()(React.memo(_FundDetailsStatistics));
export default FundDetailsStatistics;
