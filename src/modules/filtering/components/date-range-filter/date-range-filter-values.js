import { GVTextField } from "gv-react-components";
import moment from "moment";
import React, { Component, Fragment } from "react";

import { DateRangeFilterTypes } from "./date-range-filter.helpers";

class DateRangeFilterValues extends Component {
  handleOnChange = type => e => {
    this.props.onChange(type, e.target.value);
  };

  render() {
    const { type, dateStart, dateEnd } = this.props;
    switch (type) {
      case DateRangeFilterTypes.all:
        return (
          <Fragment>
            <GVTextField
              wrapperClassName="date-range-filter__date-input"
              type="text"
              name="default"
              label="Start"
              value="Program Start"
              disabled
            />
            <GVTextField
              wrapperClassName="date-range-filter__date-input"
              type="text"
              name="default"
              label="End"
              value="Today"
              disabled
            />
          </Fragment>
        );
      case DateRangeFilterTypes.lastMonth:
        return (
          <Fragment>
            <GVTextField
              wrapperClassName="date-range-filter__date-input"
              type="text"
              name="default"
              label="Start"
              value={new moment().subtract(1, "month").format("MMM Do YY")}
              disabled
            />
            <GVTextField
              wrapperClassName="date-range-filter__date-input"
              type="text"
              name="default"
              label="End"
              value="Today"
              disabled
            />
          </Fragment>
        );
      case DateRangeFilterTypes.lastWeek:
        return (
          <Fragment>
            <GVTextField
              wrapperClassName="date-range-filter__date-input"
              type="text"
              name="default"
              label="Start"
              value={new moment().subtract(1, "week").format("MMM Do YY")}
              disabled
            />
            <GVTextField
              wrapperClassName="date-range-filter__date-input"
              type="text"
              name="default"
              label="End"
              value="Today"
              disabled
            />
          </Fragment>
        );
      case DateRangeFilterTypes.custom:
      default:
        return (
          <Fragment>
            <GVTextField
              wrapperClassName="date-range-filter__date-input"
              type="text"
              name="default"
              label="Start"
              value={dateStart}
              onChange={this.handleOnChange("dateStart")}
            />
            <GVTextField
              wrapperClassName="date-range-filter__date-input"
              type="text"
              name="default"
              label="End"
              value={dateEnd}
              onChange={this.handleOnChange("dateEnd")}
            />
          </Fragment>
        );
    }
  }
}

export default DateRangeFilterValues;
