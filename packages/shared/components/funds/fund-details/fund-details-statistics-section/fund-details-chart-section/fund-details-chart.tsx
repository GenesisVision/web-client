import "shared/components/details/details-description-section/details-statistic-section/details-chart-section/details-chart-section.scss";

import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import Surface from "shared/components/surface/surface";

import FundDetailsChartElements from "./fund-details-chart-elements";

const _FundDetailsChart: React.FC<Props> = ({ t }) => (
  <Surface className="surface--horizontal-paddings details-chart">
    <h3>{t("fund-details-page.chart.heading")}</h3>
    <FundDetailsChartElements />
  </Surface>
);

interface Props extends WithTranslation {}

const FundDetailsChart = translate()(React.memo(_FundDetailsChart));
export default FundDetailsChart;
