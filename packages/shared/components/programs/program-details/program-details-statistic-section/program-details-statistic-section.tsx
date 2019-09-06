import "shared/components/details/details-description-section/details-statistic-section/details-statistic-section.scss";

import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ChartDefaultPeriod,
  DEFAULT_PERIOD
} from "shared/components/chart/chart-period/chart-period.helpers";
import { STATUS } from "shared/constants/constants";

import { programBalanceChartSelector } from "../reducers/balance-chart.reducer";
import { programProfitChartSelector } from "../reducers/profit-chart.reducer";
import {
  getBalanceChart,
  getProfitChart
} from "../services/program-details.service";
import ProgramDetailsChart from "./program-details-chart-section/program-details-chart";
import ProgramDetailsStatistics from "./program-details-statistics/program-details-statistics";

const _ProgramDetailsStatisticSection: React.FC<Props> = ({ status, id }) => {
  const dispatch = useDispatch();
  const profitChart = useSelector(programProfitChartSelector);
  const balanceChart = useSelector(programBalanceChartSelector);
  const [period, setPeriod] = useState<ChartDefaultPeriod>(DEFAULT_PERIOD);
  useEffect(
    () => {
      dispatch(getProfitChart({ id, period }));
      dispatch(getBalanceChart({ id, period }));
    },
    [period, id]
  );
  return (
    <div className="details-statistic-section">
      <div className="details-statistic-section__statistic">
        <ProgramDetailsStatistics
          profitChart={profitChart!}
          period={period}
          status={status}
        />
      </div>
      <div className="details-statistic-section__chart">
        <ProgramDetailsChart
          period={period}
          onPeriodChange={setPeriod}
          profitChart={profitChart!}
          balanceChart={balanceChart!}
        />
      </div>
    </div>
  );
};

interface Props {
  id: string;
  status: STATUS;
}

const ProgramDetailsStatisticSection = React.memo(
  _ProgramDetailsStatisticSection
);
export default ProgramDetailsStatisticSection;
