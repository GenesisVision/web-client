import "shared/components/details/details-description-section/details-statistic-section/details-statistic-section.scss";

import { ProgramBalanceChart } from "gv-api-web";
import * as React from "react";
import {
  ChartDefaultPeriod,
  DEFAULT_PERIOD
} from "shared/components/chart/chart-period/chart-period.helpers";
import { STATUS } from "shared/constants/constants";
import { CURRENCIES } from "shared/modules/currency-select/currency-select.constants";

import {
  ProgramDetailsProfitChart,
  ProgramDetailsStatistic,
  ProgramStatisticResult
} from "../services/program-details.types";
import ProgramDetailsChartSection from "./program-details-chart-section/program-details-chart-section";
import ProgramDetailsStatistics from "./program-details-statistics/program-details-statistics";

class ProgramDetailsStatisticSection extends React.PureComponent<Props, State> {
  state = {
    period: DEFAULT_PERIOD,
    statistic: undefined,
    profitChart: undefined,
    balanceChart: undefined,
    prevProps: undefined
  };

  static getDerivedStateFromProps = (props: Props, state: State): State => {
    let newState: State = {};
    if (state.prevProps !== props) {
      newState.prevProps = props;
      newState.statistic = props.statistic;
      newState.profitChart = props.profitChart;
      newState.balanceChart = props.balanceChart;
      return newState;
    }
    return state;
  };

  handlePeriodChange: HandlePeriodChangeType = period => {
    const { programId, currency, getProgramStatistic } = this.props;

    getProgramStatistic(programId, currency, period).then(data => {
      this.setState({ period, ...data });
    });
  };

  render() {
    const { statistic, profitChart, balanceChart, period } = this.state;
    return (
      <div className="details-statistic-section">
        <div className="details-statistic-section__statistic">
          <ProgramDetailsStatistics
            status={this.props.status}
            statistic={statistic}
            profitChart={profitChart}
            period={period}
          />
        </div>
        <div className="details-statistic-section__chart">
          <ProgramDetailsChartSection
            profitChart={profitChart}
            balanceChart={balanceChart}
            period={period}
            onPeriodChange={this.handlePeriodChange}
          />
        </div>
      </div>
    );
  }
}

interface Props {
  currency: CURRENCIES;
  programId: string;
  getProgramStatistic: (
    programId: string,
    currency: CURRENCIES,
    period: ChartDefaultPeriod
  ) => Promise<ProgramStatisticResult>;
  status: STATUS;
  statistic?: ProgramDetailsStatistic;
  profitChart?: ProgramDetailsProfitChart;
  balanceChart?: ProgramBalanceChart;
}

interface State {
  period?: ChartDefaultPeriod;
  statistic?: ProgramDetailsStatistic;
  profitChart?: ProgramDetailsProfitChart;
  balanceChart?: ProgramBalanceChart;
  prevProps?: Props;
}

export type HandlePeriodChangeType = (period: ChartDefaultPeriod) => void;

export default ProgramDetailsStatisticSection;
