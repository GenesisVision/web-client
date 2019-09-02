import * as React from "react";
import { ChartValuePeriodLoader } from "shared/components/details/details-description-section/details-statistic-section/details-loader/details-chart-loader";

import { useFundChartStateData } from "../fund-details-chart.helpers";
import FundProfitChartElements from "./fund-profit-chart-elements";

const _FundProfitChartSection: React.FC = () => {
  const { profitChart } = useFundChartStateData();
  return (
    <FundProfitChartElements
      condition={!!profitChart}
      loader={<ChartValuePeriodLoader />}
      profitChart={profitChart!}
    />
  );
};

const FundProfitChartSection = React.memo(_FundProfitChartSection);
export default FundProfitChartSection;
