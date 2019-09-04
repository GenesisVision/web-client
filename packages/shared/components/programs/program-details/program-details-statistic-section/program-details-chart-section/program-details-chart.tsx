import "shared/components/details/details-description-section/details-statistic-section/details-chart-section/details-chart-section.scss";

import { ProgramBalanceChart, ProgramProfitChart } from "gv-api-web";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { ChartDefaultPeriod } from "shared/components/chart/chart-period/chart-period.helpers";
import DetailsChartLoader from "shared/components/details/details-description-section/details-statistic-section/details-loader/details-chart-loader";
import Surface from "shared/components/surface/surface";
import { HandlePeriodChangeType } from "shared/utils/types";

import ProgramDetailsChartElements from "./program-details-chart-elements";

const _ProgramDetailsChart: React.FC<Props> = ({
  profitChart,
  balanceChart,
  period,
  onPeriodChange
}) => {
  const [t] = useTranslation();
  return (
    <Surface className="surface--horizontal-paddings details-chart">
      <h3>{t("program-details-page.chart.heading")}</h3>
      <ProgramDetailsChartElements
        condition={!!profitChart && !!balanceChart}
        loader={<DetailsChartLoader />}
        period={period}
        onPeriodChange={onPeriodChange}
        profitChart={profitChart!}
        balanceChart={balanceChart!}
      />
    </Surface>
  );
};

interface Props {
  profitChart: ProgramProfitChart;
  balanceChart: ProgramBalanceChart;
  period: ChartDefaultPeriod;
  onPeriodChange: HandlePeriodChangeType;
}

const ProgramDetailsChart = React.memo(_ProgramDetailsChart);
export default ProgramDetailsChart;
