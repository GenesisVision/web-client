import "./date-range-filter.scss";

import React, { useCallback } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";

import { UpdateFilterFunc } from "../../table.types";
import Filter from "../filter";
import DateRangeFilterPopover from "./date-range-filter-popover";
import {
  DATA_RANGE_FILTER_TYPES,
  IDataRangeFilterValue
} from "./date-range-filter.constants";

interface IDateRangeFilterProps {
  name: string;
  value: any;
  onChange?: UpdateFilterFunc;
  startLabel: string;
}

const _DateRangeFilter: React.FC<
  IDateRangeFilterProps & InjectedTranslateProps
> = ({ t, name, value, onChange, startLabel }) => {
  const renderValueText = useCallback(
    (value: IDataRangeFilterValue): string => {
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
    },
    [t]
  );
  return (
    <Filter
      label={t("filters.date-range.label")}
      name={name}
      renderValueText={renderValueText}
      value={value}
      updateFilter={onChange}
    >
      <DateRangeFilterPopover startLabel={startLabel} />
    </Filter>
  );
};

const DateRangeFilter = React.memo(translate()(_DateRangeFilter));
export default DateRangeFilter;
