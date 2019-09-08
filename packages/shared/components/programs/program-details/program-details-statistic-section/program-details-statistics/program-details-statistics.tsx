import "shared/components/details/details-description-section/details-statistic-section/details-statistic/details-statistics.scss";

import * as React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import DetailsStatisticsLoader from "shared/components/details/details-description-section/details-statistic-section/details-loader/details-statistic-loader";
import Surface from "shared/components/surface/surface";

import { programProfitChartSelector } from "../../reducers/profit-chart.reducer";
import { statisticPeriodSelector } from "../../reducers/statistic-period.reducer";
import ProgramDetailsStatisticsElements from "./program-details-statistics-elements";

const _ProgramDetailsStatistics: React.FC = () => {
  const profitChart = useSelector(programProfitChartSelector);
  const period = useSelector(statisticPeriodSelector);
  const [t] = useTranslation();
  return (
    <Surface className="surface--horizontal-paddings details-statistics">
      <h3>{t("program-details-page.statistics.heading")}</h3>
      <ProgramDetailsStatisticsElements
        condition={!!profitChart}
        loader={<DetailsStatisticsLoader />}
        profitChart={profitChart!}
        period={period}
      />
    </Surface>
  );
};

const ProgramDetailsStatistics = React.memo(_ProgramDetailsStatistics);
export default ProgramDetailsStatistics;
