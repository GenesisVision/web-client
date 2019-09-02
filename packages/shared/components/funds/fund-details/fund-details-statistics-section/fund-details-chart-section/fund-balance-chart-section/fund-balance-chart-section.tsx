import * as React from "react";
import { ChartValuePeriodLoader } from "shared/components/details/details-description-section/details-statistic-section/details-loader/details-chart-loader";

import { useFundChartStateData } from "../fund-details-chart.helpers";
import FundBalanceChartElements from "./fund-balance-chart-elements";

const _FundBalanceChartSection: React.FC = () => {
  const { balanceChart } = useFundChartStateData();
  return (
    <FundBalanceChartElements
      condition={!!balanceChart}
      loader={<ChartValuePeriodLoader />}
      balanceChart={balanceChart!}
    />
  );
};

const FundBalanceChartSection = React.memo(_FundBalanceChartSection);
export default FundBalanceChartSection;
