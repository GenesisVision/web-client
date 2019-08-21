import "shared/components/details/details-description-section/details-statistic-section/details-chart-section/details-chart-section.scss";

import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { ChartDefaultPeriod } from "shared/components/chart/chart-period/chart-period.helpers";
import Surface from "shared/components/surface/surface";
import { HandlePeriodChangeType } from "shared/utils/types";

import FundDetailsChartElements from "./fund-details-chart-elements";

const _FundDetailsChart: React.FC<Props> = ({
  id,
  t,
  period,
  onPeriodChange
}) => (
  <Surface className="surface--horizontal-paddings details-chart">
    <h3>{t("fund-details-page.chart.heading")}</h3>
    <FundDetailsChartElements
      id={id}
      period={period}
      onPeriodChange={onPeriodChange}
    />
  </Surface>
);

interface Props extends WithTranslation {
  id: string;
  period: ChartDefaultPeriod;
  onPeriodChange: HandlePeriodChangeType;
}

const FundDetailsChart = translate()(React.memo(_FundDetailsChart));
export default FundDetailsChart;
