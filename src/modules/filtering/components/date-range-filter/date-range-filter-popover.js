import { GVButton } from "gv-react-components";
import moment from "moment";
import React, { Component } from "react";
import { translate } from "react-i18next";

import DateRangeFilterValues from "./date-range-filter-values";
import { DateRangeFilterTypes } from "./date-range-filter.constants";

class DateRangeFilterPopover extends Component {
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

  render() {
    const { type } = this.state;
    const { t } = this.props;
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
            {t("filters.date-range.all-time")}
          </GVButton>
          <GVButton
            className="date-range-filter__btn date-range-filter__btn--type"
            variant="text"
            color="secondary"
            onClick={this.handleChangeType(DateRangeFilterTypes.lastMonth)}
            disabled={type === DateRangeFilterTypes.lastMonth}
          >
            {t("filters.date-range.last-month")}
          </GVButton>
          <GVButton
            className="date-range-filter__btn date-range-filter__btn--type"
            variant="text"
            color="secondary"
            onClick={this.handleChangeType(DateRangeFilterTypes.lastWeek)}
            disabled={type === DateRangeFilterTypes.lastWeek}
          >
            {t("filters.date-range.last-week")}
          </GVButton>
          <GVButton
            className="date-range-filter__btn date-range-filter__btn--type"
            variant="text"
            color="secondary"
            onClick={this.handleChangeType(DateRangeFilterTypes.custom)}
            disabled={type === DateRangeFilterTypes.custom}
          >
            {t("filters.date-range.custom")}
          </GVButton>
        </div>
        <div className="date-range-filter__dates">
          <div className="date-range-filter__title">
            {t("filters.date-range.label")}
          </div>
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
              {t("buttons.apply")}
            </GVButton>
            <GVButton
              className="date-range-filter__btn"
              variant="text"
              color="secondary"
              onClick={this.props.cancel}
            >
              {t("buttons.cancel")}
            </GVButton>
          </div>
        </div>
      </div>
    );
  }
}

export default translate()(DateRangeFilterPopover);
