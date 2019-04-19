import "./date-range-filter.scss";

import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";

import { IUpdateFilterFunc } from "../../table.types";
import Filter from "../filter";
import DateRangeFilterPopover from "./date-range-filter-popover";
import {
  DATE_RANGE_FILTER_TYPE,
  IDataRangeFilterValue
} from "./date-range-filter.constants";

interface IDateRangeFilterProps {
  name: string;
  value: IDataRangeFilterValue;
  onChange?: IUpdateFilterFunc;
  startLabel: string;
}

class DateRangeFilter extends React.PureComponent<
  IDateRangeFilterProps & InjectedTranslateProps
> {
  renderValueText = (value: IDataRangeFilterValue): string => {
    const { t } = this.props;
    switch (value.type) {
      case DATE_RANGE_FILTER_TYPE.ALL:
        return t("filters.date-range.all-time");
      case DATE_RANGE_FILTER_TYPE.LAST_MONTH:
        return t("filters.date-range.last-month");
      case DATE_RANGE_FILTER_TYPE.LAST_WEEK:
        return t("filters.date-range.last-week");
      case DATE_RANGE_FILTER_TYPE.CUSTOM:
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
