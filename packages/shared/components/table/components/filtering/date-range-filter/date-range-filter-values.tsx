import { subMonths, subWeeks } from "date-fns";
import React, { useCallback } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import GVDatePicker from "shared/components/gv-datepicker/gv-datepicker";
import GVTextField from "shared/components/gv-text-field";
import { localizedDate } from "shared/utils/dates";

import {
  DATA_RANGE_FILTER_TYPES,
  IDataRangeFilterValue
} from "./date-range-filter.constants";

const _DateRangeFilterValues: React.FC<
  IDateRangeFilterValuesProps & WithTranslation
> = ({ t, type, dateStart, dateEnd, startLabel, onChange }) => {
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
          <FirstInput value={localizedDate(subMonths(new Date(), 1))} />
          <SecondInput />
        </>
      );
    case DATA_RANGE_FILTER_TYPES.LAST_WEEK:
      return (
        <>
          <FirstInput value={localizedDate(subWeeks(new Date(), 1))} />
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
              value={String(dateStart)}
              InputComponent={GVDatePicker}
              horizontal="right"
              maxDate={new Date()}
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
              value={String(dateEnd)}
              horizontal="right"
              InputComponent={GVDatePicker}
              minDate={dateStart}
              maxDate={new Date()}
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
  dateStart?: Date | string | number;
  dateEnd?: Date | string | number;
  startLabel: string;
}
