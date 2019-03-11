import "./date-range-filter.scss";

import * as React from "react";
import { TranslationFunction, translate } from "react-i18next";

import { IUpdateFilterFunc } from "../../table.types";
import Filter from "../filter";
import DateRangeFilterPopover from "./date-range-filter-popover";
import {
  DATA_RANGE_FILTER_TYPES,
  IDataRangeFilterValue
} from "./date-range-filter.constants";

interface IDateRangeFilterProps {
  t: TranslationFunction;
  name: string;
  value: any;
  onChange: IUpdateFilterFunc;
  startLabel: string;
}

class DateRangeFilter extends React.Component<IDateRangeFilterProps> {
  renderValueText = (value: IDataRangeFilterValue): string => {
    const { t } = this.props;
    switch (value.type) {
      case DATA_RANGE_FILTER_TYPES.ALL:
        return t("filters.date-range.all-time");
      case DATA_RANGE_FILTER_TYPES.LAST_MOUTH:
        return t("filters.date-range.last-month");
      case DATA_RANGE_FILTER_TYPES.LAST_WEEK:
        return t("filters.date-range.last-week");
      case DATA_RANGE_FILTER_TYPES.CUSTOM:
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
