import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChartValuePeriodLoader } from "shared/components/details/details-description-section/details-statistic-section/details-loader/details-chart-loader";

import { programIdSelector } from "../../../reducers/description.reducer";
import { programProfitChartSelector } from "../../../reducers/profit-chart.reducer";
import { statisticPeriodSelector } from "../../../reducers/statistic-period.reducer";
import { getProfitChart } from "../../../services/program-details.service";
import ProgramProfitChartElements from "./program-profit-chart-elements";

const _ProgramProfitChartSection: React.FC = () => {
  const dispatch = useDispatch();
  const id = useSelector(programIdSelector);
  const period = useSelector(statisticPeriodSelector);
  useEffect(
    () => {
      dispatch(getProfitChart({ id, period }));
    },
    [period, id]
  );
  const profitChart = useSelector(programProfitChartSelector);
  return (
    <ProgramProfitChartElements
      condition={!!profitChart}
      loader={<ChartValuePeriodLoader />}
      profitChart={profitChart!}
    />
  );
};

const ProgramProfitChartSection = React.memo(_ProgramProfitChartSection);
export default ProgramProfitChartSection;
