import "shared/components/details/details-description-section/details-statistic-section/details-statistic/details-statistics.scss";

import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { ChartDefaultPeriod } from "shared/components/chart/chart-period/chart-period.helpers";
import DetailsStatisticsLoader from "shared/components/details/details-description-section/details-statistic-section/details-loader/details-statistic-loader";
import Surface from "shared/components/surface/surface";

import { FundDetailsStatistic } from "../../services/fund-details.types";
import FundDetailsStatisticsElements from "./fund-details-statistics-elements";

const _FundDetailsStatistics: React.FC<Props> = ({ t, statistic, period }) => (
  <Surface className="surface--horizontal-paddings details-statistics">
    <h3>{t("fund-details-page.statistics.heading")}</h3>
    <FundDetailsStatisticsElements
      condition={!!statistic}
      loader={<DetailsStatisticsLoader />}
      statistic={statistic!}
      period={period}
    />
  </Surface>
);

interface Props extends InjectedTranslateProps {
  period: ChartDefaultPeriod;
  statistic?: FundDetailsStatistic;
}

const FundDetailsStatistics = React.memo(translate()(_FundDetailsStatistics));
export default FundDetailsStatistics;
