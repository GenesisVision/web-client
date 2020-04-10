import GVDatePicker from "components/gv-datepicker/gv-datepicker";
import GVTextField from "components/gv-text-field";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { localizedDate, subtractDate } from "utils/dates";

import {
  DATA_RANGE_FILTER_TYPES,
  DATE_RANGE_MAX_FILTER_NAME,
  DATE_RANGE_MIN_FILTER_NAME,
  IDataRangeFilterValue
} from "./date-range-filter.constants";
import { dateToInput } from "./date-range-filter.helpers";

const _DateRangeFilterValues: React.FC<IDateRangeFilterValuesProps> = props => {
  const { type, startLabel, onChange } = props;
  const [t] = useTranslation();
  const handleOnChange = useCallback(
    (type: keyof IDataRangeFilterValue) => (e: React.ChangeEvent<any>) =>
      onChange(type, e.target.value),
    [onChange]
  );

  switch (type) {
    case DATA_RANGE_FILTER_TYPES.ALL:
      return (
        <>
          <FirstInput value={startLabel} />
          <SecondInput />
        </>
      );
    case DATA_RANGE_FILTER_TYPES.LAST_MONTH:
      return (
        <>
          <FirstInput
            value={localizedDate(subtractDate(new Date(), 1, "month"))}
          />
          <SecondInput />
        </>
      );
    case DATA_RANGE_FILTER_TYPES.LAST_WEEK:
      return (
        <>
          <FirstInput
            value={localizedDate(subtractDate(new Date(), 1, "week"))}
          />
          <SecondInput />
        </>
      );
    case DATA_RANGE_FILTER_TYPES.CUSTOM:
    default:
      return (
        <>
          {
            //@ts-ignore
            <GVTextField
              wrapperClassName="date-range-filter__date-input"
              type="text"
              name={DATE_RANGE_MIN_FILTER_NAME}
              label={t("filters.date-range.start")}
              value={props[DATE_RANGE_MIN_FILTER_NAME]}
              InputComponent={GVDatePicker}
              //@ts-ignore
              horizontal="right"
              //@ts-ignore
              maxDate={dateToInput(new Date())}
              onChange={handleOnChange(DATE_RANGE_MIN_FILTER_NAME)}
            />
          }
          {
            //@ts-ignore
            <GVTextField
              wrapperClassName="date-range-filter__date-input"
              type="text"
              name={DATE_RANGE_MAX_FILTER_NAME}
              label={t("filters.date-range.end")}
              value={props[DATE_RANGE_MAX_FILTER_NAME]}
              //@ts-ignore
              horizontal="right"
              InputComponent={GVDatePicker}
              minDate={props[DATE_RANGE_MIN_FILTER_NAME]}
              //@ts-ignore
              maxDate={dateToInput(new Date())}
              onChange={handleOnChange(DATE_RANGE_MAX_FILTER_NAME)}
            />
          }
        </>
      );
  }
};

const _FirstInput: React.FC<{ value: string }> = ({ value }) => {
  const [t] = useTranslation();
  return (
    //@ts-ignore TODO сделать фикс GVTextField
    <GVTextField
      wrapperClassName="date-range-filter__date-input"
      type="text"
      name="startDate"
      label={t("filters.date-range.start")}
      value={value}
      disabled
    />
  );
};
const FirstInput = React.memo(_FirstInput);

const _SecondInput: React.FC = () => {
  const [t] = useTranslation();
  return (
    <GVTextField
      wrapperClassName="date-range-filter__date-input"
      type="text"
      name="endDate"
      label={t("filters.date-range.end")}
      value={t<string>("filters.date-range.today")}
      disabled
    />
  );
};
const SecondInput = React.memo(_SecondInput);

const DateRangeFilterValues = React.memo(_DateRangeFilterValues);
export default DateRangeFilterValues;

interface IDateRangeFilterValuesProps {
  onChange(type: keyof IDataRangeFilterValue, date: string): void;
  type: DATA_RANGE_FILTER_TYPES;
  [DATE_RANGE_MIN_FILTER_NAME]?: string;
  [DATE_RANGE_MAX_FILTER_NAME]?: string;
  startLabel: string;
}
