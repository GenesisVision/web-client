import GVDatePicker from "components/gv-datepicker/gv-datepicker";
import GVTextField from "components/gv-text-field";
import React, { useCallback } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { localizedDate, subtractDate } from "utils/dates";

import {
  DATA_RANGE_FILTER_TYPES,
  IDataRangeFilterValue
} from "./date-range-filter.constants";
import { dateToInput } from "./date-range-filter.helpers";

const _DateRangeFilterValues: React.FC<IDateRangeFilterValuesProps &
  WithTranslation> = ({
  t,
  type,
  dateStart,
  dateEnd,
  startLabel,
  onChange
}) => {
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
              name="dateStart"
              label={t("filters.date-range.start")}
              value={dateStart}
              InputComponent={GVDatePicker}
              //@ts-ignore
              horizontal="right"
              //@ts-ignore
              maxDate={dateToInput(new Date())}
              onChange={handleOnChange("dateStart")}
            />
          }
          {
            //@ts-ignore
            <GVTextField
              wrapperClassName="date-range-filter__date-input"
              type="text"
              name="dateEnd"
              label={t("filters.date-range.end")}
              value={dateEnd}
              //@ts-ignore
              horizontal="right"
              InputComponent={GVDatePicker}
              minDate={dateStart}
              //@ts-ignore
              maxDate={dateToInput(new Date())}
              onChange={handleOnChange("dateEnd")}
            />
          }
        </>
      );
  }
};

const _FirstInput: React.FC<{ value: string } & WithTranslation> = ({
  t,
  value
}) => (
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
const FirstInput = translate()(React.memo(_FirstInput));

const _SecondInput: React.FC<WithTranslation> = ({ t }) => (
  <GVTextField
    wrapperClassName="date-range-filter__date-input"
    type="text"
    name="endDate"
    label={t("filters.date-range.end")}
    value={t<string>("filters.date-range.today")}
    disabled
  />
);
const SecondInput = translate()(React.memo(_SecondInput));

const DateRangeFilterValues = translate()(React.memo(_DateRangeFilterValues));
export default DateRangeFilterValues;

interface IDateRangeFilterValuesProps {
  onChange(type: keyof IDataRangeFilterValue, date: string): void;
  type: DATA_RANGE_FILTER_TYPES;
  dateStart?: string;
  dateEnd?: string;
  startLabel: string;
}
