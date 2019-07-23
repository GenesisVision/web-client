import "shared/components/details/details-description-section/details-statistic-section/details-statistic-section.scss";

import { ProgramBalanceChart } from "gv-api-web";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import {
  ChartDefaultPeriod,
  DEFAULT_PERIOD
} from "shared/components/chart/chart-period/chart-period.helpers";
import { STATUS } from "shared/constants/constants";
import { CurrencyEnum, HandlePeriodChangeType } from "shared/utils/types";

import {
  ProgramDetailsProfitChart,
  ProgramDetailsStatistic,
  ProgramStatisticResult
} from "../services/program-details.types";
import ProgramDetailsChart from "./program-details-chart-section/program-details-chart";
import ProgramDetailsStatistics from "./program-details-statistics/program-details-statistics";

class _ProgramDetailsStatisticSection extends React.PureComponent<
  Props,
  State
> {
  state = {
    period: DEFAULT_PERIOD,
    statistic: undefined,
    profitChart: undefined,
    balanceChart: undefined,
    prevProps: undefined
  };

  static getDerivedStateFromProps = (props: Props, state: State): State => {
    let newState: State = {};
    const isCurrencyChanged =
      state.prevProps !== undefined &&
      state.prevProps.currency !== props.currency;

    if (state.prevProps !== props && !isCurrencyChanged) {
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
    const { programId, currency, getProgramStatistic } = this.props;

    getProgramStatistic(programId, currency, period).then(data => {
      this.setState({ period, ...data });
    });
  };

  render() {
    const { t, status } = this.props;
    const { statistic, profitChart, balanceChart, period } = this.state;
    return (
      <div className="details-statistic-section">
        <div className="details-statistic-section__statistic">
          <ProgramDetailsStatistics
            statistic={statistic!}
            profitChart={profitChart!}
            period={period}
            status={status}
          />
        </div>
        <div className="details-statistic-section__chart">
          <ProgramDetailsChart
            period={period}
            onPeriodChange={this.handlePeriodChange}
            profitChart={profitChart!}
            balanceChart={balanceChart!}
          />
        </div>
      </div>
    );
  }
}

interface Props extends WithTranslation {
  currency: CurrencyEnum;
  programId: string;
  getProgramStatistic: (
    programId: string,
    currency: CurrencyEnum,
    period: ChartDefaultPeriod
  ) => Promise<ProgramStatisticResult>;
  status: STATUS;
  statistic?: ProgramStatisticResult;
}

interface State {
  period?: ChartDefaultPeriod;
  statistic?: ProgramDetailsStatistic;
  profitChart?: ProgramDetailsProfitChart;
  balanceChart?: ProgramBalanceChart;
  prevProps?: Props;
}

const ProgramDetailsStatisticSection = translate()(
  _ProgramDetailsStatisticSection
);
export default ProgramDetailsStatisticSection;
