import "./date-range-filter.scss";

import { GVButton, GVTextField } from "gv-react-components";
import moment from "moment";
import React, { Component, Fragment } from "react";

import DateRangeFilterValues from "./date-range-filter-values";
import { DateRangeFilterTypes } from "./date-range-filter.helpers";

class DateRangeFilter extends Component {
  state = {
    type: this.props.value.type,
    dateStart: this.props.value.dateStart,
    dateEnd: this.props.value.dateEnd
  };

  handleChangeType = type => e => {
    this.setState({
      type,
      dateStart: moment()
        .subtract(1, "day")
        .format("YYYY-MM-DD"),
      dateEnd: moment().format("YYYY-MM-DD")
    });
  };
  handleChangeDate = (type, date) => {
    this.setState({ [type]: date });
  };
  handleChange = e => {
    this.setState({ value: e });
  };
  handleSubmit = e => {
    this.props.changeFilter(this.state);
  };
  renderRangeValues = () => {
    switch (this.state.type) {
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
              value="A month ago"
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
      default:
        return 1;
    }
  };

  render() {
    const { type, dateStart, dateEnd } = this.state;
    return (
      <div className="date-range-filter">
        <div className="date-range-filter__type">
          <GVButton
            className="date-range-filter__btn date-range-filter__btn--type"
            variant="text"
            color="secondary"
            onClick={this.handleChangeType(DateRangeFilterTypes.all)}
            disabled={type === DateRangeFilterTypes.all}
          >
            All time
          </GVButton>
          <GVButton
            className="date-range-filter__btn date-range-filter__btn--type"
            variant="text"
            color="secondary"
            onClick={this.handleChangeType(DateRangeFilterTypes.lastMonth)}
            disabled={type === DateRangeFilterTypes.lastMonth}
          >
            Last month
          </GVButton>
          <GVButton
            className="date-range-filter__btn date-range-filter__btn--type"
            variant="text"
            color="secondary"
            onClick={this.handleChangeType(DateRangeFilterTypes.lastWeek)}
            disabled={type === DateRangeFilterTypes.lastWeek}
          >
            Last week
          </GVButton>
          <GVButton
            className="date-range-filter__btn date-range-filter__btn--type"
            variant="text"
            color="secondary"
            onClick={this.handleChangeType(DateRangeFilterTypes.custom)}
            disabled={type === DateRangeFilterTypes.custom}
          >
            Custom
          </GVButton>
        </div>
        <div className="date-range-filter__dates">
          <div className="date-range-filter__title">Date range</div>
          <div className="date-range-filter__values">
            <DateRangeFilterValues
              {...this.state}
              onChange={this.handleChangeDate}
            />
          </div>
          <div className="date-range-filter__btns">
            <GVButton
              className="date-range-filter__btn"
              variant="text"
              onClick={this.handleSubmit}
            >
              Apply
            </GVButton>
            <GVButton
              className="date-range-filter__btn"
              variant="text"
              color="secondary"
              onClick={this.props.cancel}
            >
              Cancel
            </GVButton>
          </div>
        </div>
      </div>
    );
  }
}

export default DateRangeFilter;
