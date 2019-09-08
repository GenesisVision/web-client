import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChartValuePeriodLoader } from "shared/components/details/details-description-section/details-statistic-section/details-loader/details-chart-loader";

import { programBalanceChartSelector } from "../../../reducers/balance-chart.reducer";
import { programIdSelector } from "../../../reducers/description.reducer";
import { statisticPeriodSelector } from "../../../reducers/statistic-period.reducer";
import { getBalanceChart } from "../../../services/program-details.service";
import ProgramBalanceChartElements from "./program-balance-chart-elements";

const _ProgramBalanceChartSection: React.FC = () => {
  const dispatch = useDispatch();
  const id = useSelector(programIdSelector);
  const period = useSelector(statisticPeriodSelector);
  useEffect(
    () => {
      dispatch(getBalanceChart({ id, period }));
    },
    [period, id]
  );
  const balanceChart = useSelector(programBalanceChartSelector);
  return (
    <ProgramBalanceChartElements
      condition={!!balanceChart}
      loader={<ChartValuePeriodLoader />}
      balanceChart={balanceChart!}
    />
  );
};

const ProgramBalanceChartSection = React.memo(_ProgramBalanceChartSection);
export default ProgramBalanceChartSection;
