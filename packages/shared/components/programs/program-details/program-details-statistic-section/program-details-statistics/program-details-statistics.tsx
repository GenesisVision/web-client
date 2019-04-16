import "shared/components/details/details-description-section/details-statistic-section/details-statistic/details-statistics.scss";

import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { ChartDefaultPeriod } from "shared/components/chart/chart-period/chart-period.helpers";
import DetailsStatisticsLoader from "shared/components/details/details-description-section/details-statistic-section/details-loader/details-statistic-loader";
import Surface from "shared/components/surface/surface";
import { STATUS } from "shared/constants/constants";

import {
  ProgramDetailsProfitChart,
  ProgramDetailsStatistic
} from "../../services/program-details.types";
import ProgramDetailsStatisticsElements from "./program-details-statistics-elements";

const ProgramDetailsStatistics: React.FC<Props> = ({
  t,
  statistic,
  profitChart,
  period,
  status
}) => (
  <Surface className="surface--horizontal-paddings details-statistics">
    <h3>{t("program-details-page.statistics.heading")}</h3>
    {(statistic && profitChart && (
      <ProgramDetailsStatisticsElements
        statistic={statistic}
        profitChart={profitChart}
        period={period}
        status={status}
      />
    )) || <DetailsStatisticsLoader />}
  </Surface>
);

interface Props extends InjectedTranslateProps {
  status: STATUS;
  period: ChartDefaultPeriod;
  statistic?: ProgramDetailsStatistic;
  profitChart?: ProgramDetailsProfitChart;
}

export default React.memo(translate()(ProgramDetailsStatistics));
