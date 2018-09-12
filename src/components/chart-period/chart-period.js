import "./chart-period.scss";

import classnames from "classnames";
import moment from "moment";
import React, { Component } from "react";
import { translate } from "react-i18next";

export const ChartPeriodType = {
  day: "day",
  week: "week",
  month: "month",
  quarter: "quarter",
  year: "year",
  all: "all"
};

const getPeriodStartDate = period => {
  switch (period) {
    case ChartPeriodType.all:
      return undefined;
    default:
      return moment().subtract(1, `${period}s`);
  }
};

class ChartPeriod extends Component {
  state = {
    period: ChartPeriodType.month,
    start: getPeriodStartDate(ChartPeriodType.month),
    end: moment()
  };

  handleChangePeriod = newPeriod => () => {
    const { period } = this.state;
    if (period !== newPeriod) {
      const start = getPeriodStartDate(newPeriod);
      this.setState({ start, period: newPeriod });
    }
  };

  renderDateRange = () => {
    const { period, start, end } = this.state;
    if (period === ChartPeriodType.all) return null;
    return (
      <span>
        {start.format("ll")} - {end.format("ll")}
      </span>
    );
  };

  render() {
    const { t } = this.props;
    const { period } = this.state;
    return (
      <div className="chart-period">
        <div className="chart-period__period">
          {Object.keys(ChartPeriodType).map(x => (
            <span
              key={x}
              className={classnames("chart-period__period-item", {
                "chart-period__period-item--active": period === x
              })}
              onClick={this.handleChangePeriod(x)}
            >
              {t(`chart-period.${ChartPeriodType[x]}`)}
            </span>
          ))}
        </div>
        <div className="chart-period__date-range">{this.renderDateRange()}</div>
      </div>
    );
  }
}

export default translate()(ChartPeriod);
