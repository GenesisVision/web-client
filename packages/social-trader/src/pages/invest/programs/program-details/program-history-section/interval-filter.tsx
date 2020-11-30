import {
  DATA_RANGE_FILTER_TYPES,
  DATE_RANGE_FILTER_NAME,
  DATE_RANGE_MAX_FILTER_NAME,
  DATE_RANGE_MIN_FILTER_NAME
} from "components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { FilteringType } from "components/table/components/filtering/filter.type";
import SelectFilter from "components/table/components/filtering/select-filter/select-filter";
import { SelectFilterType } from "components/table/components/filtering/select-filter/select-filter.constants";
import { UpdateFilterFunc } from "components/table/components/table.types";
import React from "react";
import { useTranslation } from "react-i18next";
import { diffDateRaw } from "utils/dates";

export interface IIntervalFilterProps {
  updateFilter: UpdateFilterFunc;
  filtering: FilteringType;
}

export const INTERVAL_FILTER_NAME = "timeframe";

export const INTERVAL_FILTER_VALUES = [
  {
    value: "Month",
    labelKey: `program-details-page:history.financial-statistic.interval-filter.values.month`
  },
  {
    value: "Week",
    labelKey: `program-details-page:history.financial-statistic.interval-filter.values.week`
  },
  {
    value: "Day",
    labelKey: `program-details-page:history.financial-statistic.interval-filter.values.day`
  }
];

const _IntervalFilter: React.FC<IIntervalFilterProps> = ({
  updateFilter,
  filtering
}) => {
  const [t] = useTranslation();
  const isWeek =
    filtering[DATE_RANGE_FILTER_NAME]?.type ===
    DATA_RANGE_FILTER_TYPES.LAST_WEEK;
  const diffCustomDate = Math.abs(
    diffDateRaw(
      filtering[DATE_RANGE_FILTER_NAME][DATE_RANGE_MAX_FILTER_NAME],
      filtering[DATE_RANGE_FILTER_NAME][DATE_RANGE_MIN_FILTER_NAME],
      "day"
    )
  );
  const lessWeek = diffCustomDate < 7;
  const values = INTERVAL_FILTER_VALUES.filter(({ value }) => {
    if (
      !filtering[DATE_RANGE_FILTER_NAME][DATE_RANGE_MAX_FILTER_NAME] ||
      !filtering[DATE_RANGE_FILTER_NAME][DATE_RANGE_MIN_FILTER_NAME]
    )
      return true;
    if ((isWeek || lessWeek) && value === "month") return false;
    if (lessWeek && value === "week") return false;
    return true;
  });

  if (!values.find(({ value }) => value === filtering[INTERVAL_FILTER_NAME]))
    updateFilter({ name: INTERVAL_FILTER_NAME, value: values[0].value });

  return (
    <SelectFilter
      name={INTERVAL_FILTER_NAME}
      label={t(
        "program-details-page:history.financial-statistic.interval-filter.name"
      )}
      value={filtering[INTERVAL_FILTER_NAME] as SelectFilterType} //TODO fix filtering types
      values={values}
      onChange={updateFilter}
    />
  );
};

export const IntervalFilter = React.memo(_IntervalFilter);
