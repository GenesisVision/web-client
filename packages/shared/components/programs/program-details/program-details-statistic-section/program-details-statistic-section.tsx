import "shared/components/details/details-description-section/details-statistic-section/details-statistic-section.scss";

import * as React from "react";
import { useEffect, useState } from "react";
import { connect, ResolveThunks } from "react-redux";
import {
  ActionCreatorsMapObject,
  bindActionCreators,
  compose,
  Dispatch
} from "redux";
import {
  ChartDefaultPeriod,
  DEFAULT_PERIOD
} from "shared/components/chart/chart-period/chart-period.helpers";
import { STATUS } from "shared/constants/constants";
import { RootState } from "shared/reducers/root-reducer";

import {
  ProgramBalanceChartDataType,
  programBalanceChartSelector
} from "../reducers/balance-chart.reducer";
import {
  ProgramProfitChartDataType,
  programProfitChartSelector
} from "../reducers/profit-chart.reducer";
import {
  getBalanceChart,
  getProfitChart
} from "../services/program-details.service";
import ProgramDetailsChart from "./program-details-chart-section/program-details-chart";
import ProgramDetailsStatistics from "./program-details-statistics/program-details-statistics";

const _ProgramDetailsStatisticSection: React.FC<Props> = ({
  status,
  balanceChart,
  profitChart,
  id,
  service: { getProfitChart, getBalanceChart }
}) => {
  const [period, setPeriod] = useState<ChartDefaultPeriod>(DEFAULT_PERIOD);
  useEffect(
    () => {
      getProfitChart({ id, period });
      getBalanceChart({ id, period });
    },
    [period, id, getProfitChart, getBalanceChart]
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

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    { getProfitChart, getBalanceChart },
    dispatch
  )
});

const mapStateToProps = (state: RootState): StateProps => ({
  profitChart: programProfitChartSelector(state),
  balanceChart: programBalanceChartSelector(state)
});

interface StateProps {
  profitChart?: ProgramProfitChartDataType;
  balanceChart?: ProgramBalanceChartDataType;
}

interface OwnProps {
  id: string;
  status: STATUS;
}

interface Props extends OwnProps, DispatchProps, StateProps {}

interface ServiceThunks extends ActionCreatorsMapObject {
  getProfitChart: typeof getProfitChart;
  getBalanceChart: typeof getBalanceChart;
}
interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

const ProgramDetailsStatisticSection = compose<React.ComponentType<OwnProps>>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  React.memo
)(_ProgramDetailsStatisticSection);
export default ProgramDetailsStatisticSection;
