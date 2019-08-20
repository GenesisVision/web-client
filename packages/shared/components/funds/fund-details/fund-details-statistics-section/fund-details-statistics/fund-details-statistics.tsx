import "shared/components/details/details-description-section/details-statistic-section/details-statistic/details-statistics.scss";

import { FundProfitChart } from "gv-api-web";
import * as React from "react";
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
}) => (
  <Surface className="surface--horizontal-paddings details-statistics">
    <h3>{t("fund-details-page.statistics.heading")}</h3>
    <FundDetailsStatisticsElements
      condition={!!statistic}
      loader={<DetailsStatisticsLoader />}
      statisticCurrency={statisticCurrency}
      statistic={statistic!}
      period={period}
    />
  </Surface>
);

interface Props extends WithTranslation {
  statisticCurrency: CurrencyEnum;
  period: ChartDefaultPeriod;
  statistic?: FundProfitChart;
}

const FundDetailsStatistics = translate()(React.memo(_FundDetailsStatistics));
export default FundDetailsStatistics;
