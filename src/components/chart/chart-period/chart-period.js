import "./chart-period.scss";

import classnames from "classnames";
import { GVButton } from "gv-react-components";
import moment from "moment";
import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import { translate } from "react-i18next";

import { ChartPeriodType, getPeriodStartDate } from "./chart-period.helpers";

class ChartPeriod extends PureComponent {
  handleChangePeriod = newPeriodType => () => {
    const { period } = this.props;
    if (period.type !== newPeriodType) {
      const start = getPeriodStartDate(newPeriodType);
      const end = moment();
      this.props.onChange({ type: newPeriodType, start, end });
    }
  };

  renderDateRange = () => {
    const { period } = this.props;
    if (period.type === ChartPeriodType.all) return null;
    return (
      <span>
        {period.start.format("ll")} - {period.end.format("ll")}
      </span>
    );
  };

  render() {
    const { t, period } = this.props;
    const { type } = period;
    return (
      <div className="chart-period">
        <div className="chart-period__period">
          {Object.values(ChartPeriodType).map(x => (
            <GVButton
              key={x}
              className={classnames("chart-period__period-item", {
                "chart-period__period-item--active": type === x
              })}
              onClick={this.handleChangePeriod(x)}
              variant="text"
              color="secondary"
              disabled={type === x}
            >
              {t(`chart-period.${ChartPeriodType[x]}-short`)}
            </GVButton>
          ))}
        </div>
        <div className="chart-period__date-range">{this.renderDateRange()}</div>
      </div>
    );
  }
}

const periodShape = PropTypes.shape({
  type: PropTypes.oneOf(Object.values(ChartPeriodType))
});

ChartPeriod.propTypes = {
  period: periodShape.isRequired,
  onChange: PropTypes.func
};

export default translate()(ChartPeriod);
