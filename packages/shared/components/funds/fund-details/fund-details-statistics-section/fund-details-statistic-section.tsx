import "shared/components/details/details-description-section/details-statistic-section/details-statistic-section.scss";

import { FundBalanceChart } from "gv-api-web";
import * as React from "react";
import {
  ChartDefaultPeriod,
  DEFAULT_PERIOD
} from "shared/components/chart/chart-period/chart-period.helpers";
import { HandlePeriodChangeType } from "shared/utils/types";

import {
  FundDetailsProfitChart,
  FundDetailsStatistic as FundDetailsStatisticType,
  FundStatisticResult
} from "../services/fund-details.types";
import FundDetailsChart from "./fund-details-chart-section/fund-details-chart";
import FundDetailsStatistics from "./fund-details-statistics/fund-details-statistics";

class FundDetailsStatisticSection extends React.PureComponent<Props, State> {
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
      if (props.statistic) {
        newState.statistic = props.statistic.statistic;
        newState.profitChart = props.statistic.profitChart;
        newState.balanceChart = props.statistic.balanceChart;
      }
      return newState;
    }
    return state;
  };

  handlePeriodChange: HandlePeriodChangeType = period => {
    const { programId, getFundStatistic } = this.props;

    getFundStatistic(programId, period).then(data => {
      this.setState({ period, ...data });
    });
  };

  render() {
    const { statistic, profitChart, balanceChart, period } = this.state;
    return (
      <div className="details-statistic-section">
        <div className="details-statistic-section__statistic">
          <FundDetailsStatistics statistic={statistic} period={period} />
        </div>
        <div className="details-statistic-section__chart">
          <FundDetailsChart
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
  programId: string;
  getFundStatistic: (
    programId: string,
    period: ChartDefaultPeriod
  ) => Promise<FundStatisticResult>;
  statistic?: FundStatisticResult;
}

interface State {
  period?: ChartDefaultPeriod;
  statistic?: FundDetailsStatisticType;
  profitChart?: FundDetailsProfitChart;
  balanceChart?: FundBalanceChart;
  prevProps?: Props;
}

export default FundDetailsStatisticSection;
