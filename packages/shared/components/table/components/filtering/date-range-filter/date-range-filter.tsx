import "./date-range-filter.scss";

import React, { Component } from "react";
import { TranslationFunction, translate } from "react-i18next";

import { IUpdateFilterFunc } from "../../table.types";
import Filter from "../filter";
import DateRangeFilterPopover from "./date-range-filter-popover";
import { DateRangeFilterTypes } from "./date-range-filter.constants";

interface IDateRangeFilterProps {
  t: TranslationFunction;
  name: string;
  value: any;
  onChange: IUpdateFilterFunc;

  startLabel: string;
}

class DateRangeFilter extends Component<IDateRangeFilterProps> {
  renderValueText = (value: any) => {
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
        <DateRangeFilterPopover startLabel={this.props.startLabel} />
      </Filter>
    );
  }
}

export default translate()(DateRangeFilter);
