import "shared/components/details/details-description-section/details-statistic-section/details-statistic/details-statistics.scss";

import { ProgramProfitChart } from "gv-api-web";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { ChartDefaultPeriod } from "shared/components/chart/chart-period/chart-period.helpers";
import DetailsStatisticsLoader from "shared/components/details/details-description-section/details-statistic-section/details-loader/details-statistic-loader";
import Surface from "shared/components/surface/surface";
import { STATUS } from "shared/constants/constants";

import ProgramDetailsStatisticsElements from "./program-details-statistics-elements";

const _ProgramDetailsStatistics: React.FC<Props> = ({
  status,
  profitChart,
  period
}) => {
  const [t] = useTranslation();
  return (
    <Surface className="surface--horizontal-paddings details-statistics">
      <h3>{t("program-details-page.statistics.heading")}</h3>
      <ProgramDetailsStatisticsElements
        condition={!!profitChart}
        loader={<DetailsStatisticsLoader />}
        profitChart={profitChart!}
        period={period}
        status={status}
      />
    </Surface>
  );
};

interface Props {
  status: STATUS;
  profitChart: ProgramProfitChart;
  period: ChartDefaultPeriod;
}

const ProgramDetailsStatistics = React.memo(_ProgramDetailsStatistics);
export default ProgramDetailsStatistics;
