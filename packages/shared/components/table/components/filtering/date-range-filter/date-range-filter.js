import "./date-range-filter.scss";

import PropTypes from "prop-types";
import React, { Component } from "react";
import { translate } from "react-i18next";

import Filter from "../filter";
import DateRangeFilterPopover from "./date-range-filter-popover";
import { DateRangeFilterTypes } from "./date-range-filter.constants";

class DateRangeFilter extends Component {
  renderValueText = value => {
    const { t } = this.props;
    switch (value.type) {
      case DateRangeFilterTypes.all:
        return t("filters.date-range.all-time");
      case DateRangeFilterTypes.lastMonth:
        return t("filters.date-range.last-month");
      case DateRangeFilterTypes.lastWeek:
        return t("filters.date-range.last-week");
      case DateRangeFilterTypes.custom:
      default:
        return t("filters.date-range.custom");
    }
  };
  render() {
    return (
      <Filter
        label={this.props.t("filters.date-range.label")}
        name={this.props.name}
        renderValueText={this.renderValueText}
        value={this.props.value}
        updateFilter={this.props.onChange}
      >
        <DateRangeFilterPopover
          values={this.props.values}
          startLabel={this.props.startLabel}
        />
      </Filter>
    );
  }
}

DateRangeFilter.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func
};

export default translate()(DateRangeFilter);
