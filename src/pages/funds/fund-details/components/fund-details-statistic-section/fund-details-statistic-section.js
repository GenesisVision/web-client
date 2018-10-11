import "./fund-details-statistic-section.scss";

import {
  ChartPeriodType,
  getPeriodStartDate
} from "components/chart/chart-period/chart-period.helpers";
import moment from "moment";
import React, { PureComponent } from "react";

import { getFundStatistic } from "../../services/fund-details.service";
import FundDetailsChartSection from "./fund-details-chart-section/fund-details-chart-section";
import FundDetailsStatistic from "./fund-details-statistics/fund-details-statistics";

class FundDetailsStatisticSection extends PureComponent {
  state = {
    statisticData: { data: null, isPending: true },
    profitChartData: { data: null, isPending: true },
    balanceChartData: { data: null, isPending: true },
    period: {
      type: ChartPeriodType.month,
      start: getPeriodStartDate(ChartPeriodType.month),
      end: moment()
    },
    prevProps: null
  };

  static getDerivedStateFromProps(props, state) {
    let newState = {};
    if (state.prevProps !== props) {
      newState.prevProps = props;
      newState.statisticData = props.statisticData;
      newState.profitChartData = props.profitChartData;
      newState.balanceChartData = props.balanceChartData;
      return newState;
    }

    return state;
  }

  handlePeriodChange = period => {
    const { programId, currency } = this.props;

    getFundStatistic(programId, currency, period).then(data => {
      this.setState({ period, ...data });
    });
  };

  render() {
    const { statisticData, profitChartData, balanceChartData } = this.state;
    const { period } = this.state;
    return (
      <div className="fund-details-statistic-section">
        <div className="fund-details-statistic-section__statistic">
          <FundDetailsStatistic statisticData={statisticData} period={period} />
        </div>
        <div className="fund-details-statistic-section__chart">
          <FundDetailsChartSection
            profitChartData={profitChartData}
            balanceChartData={balanceChartData}
            period={period}
            onPeriodChange={this.handlePeriodChange}
          />
        </div>
      </div>
    );
  }
}

export default FundDetailsStatisticSection;
