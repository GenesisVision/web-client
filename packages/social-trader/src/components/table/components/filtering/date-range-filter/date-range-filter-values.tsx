import GVDatePicker from "components/gv-datepicker/gv-datepicker";
import GVTextField from "components/gv-text-field";
import { RowItem } from "components/row-item/row-item";
import React, { FocusEvent, useCallback } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { localizedDate, subtractDate } from "utils/dates";

import {
  DATA_RANGE_FILTER_TYPES,
  DATE_RANGE_MAX_FILTER_NAME,
  DATE_RANGE_MIN_FILTER_NAME,
  IDataRangeFilterValue
} from "./date-range-filter.constants";
import { dateToInput } from "./date-range-filter.helpers";

interface IDateRangeFilterValuesProps {
  onChange: (type: keyof IDataRangeFilterValue, date: string) => void;
  type: DATA_RANGE_FILTER_TYPES;
  firstInputMinDate?: Date;
  [DATE_RANGE_MIN_FILTER_NAME]?: string;
  [DATE_RANGE_MAX_FILTER_NAME]?: string;
  startLabel?: string;
}

const DateInput = styled(RowItem)`
  width: 140px;
`;

const _DateRangeFilterValues: React.FC<IDateRangeFilterValuesProps> = props => {
  const { type, startLabel, onChange, firstInputMinDate } = props;
  const [t] = useTranslation();
  const handleOnChange = useCallback(
    (type: keyof IDataRangeFilterValue) => (e: React.ChangeEvent<any>) => {
      onChange(type, e.target.value);
    },
    [onChange]
  );

  const handleBlur = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      const type = event.target.name as keyof IDataRangeFilterValue;
      if (event.target.value.length === 0) {
        onChange(type, props[type]!);
      }
    },
    [onChange]
  );

  switch (type) {
    case DATA_RANGE_FILTER_TYPES.ALL:
      return (
        <>
          <FirstInput value={startLabel!} />
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
          <DateInput>
            <GVTextField
              onBlur={handleBlur}
              type="text"
              name={DATE_RANGE_MIN_FILTER_NAME}
              label={t("filters.date-range.start")}
              value={props[DATE_RANGE_MIN_FILTER_NAME]}
              InputComponent={GVDatePicker}
              //@ts-ignore
              horizontal="right"
              //@ts-ignore
              minDate={dateToInput(firstInputMinDate)}
              maxDate={dateToInput(new Date())}
              onChange={handleOnChange(DATE_RANGE_MIN_FILTER_NAME)}
            />
          </DateInput>
          <DateInput>
            <GVTextField
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
          </DateInput>
        </>
      );
  }
};

const _FirstInput: React.FC<{ value: string }> = ({ value }) => {
  const [t] = useTranslation();
  return (
    //@ts-ignore TODO сделать фикс GVTextField
    <DateInput>
      <GVTextField
        wide
        type="text"
        name="startDate"
        label={t("filters.date-range.start")}
        value={value}
        disabled
      />
    </DateInput>
  );
};
const FirstInput = React.memo(_FirstInput);

const _SecondInput: React.FC = () => {
  const [t] = useTranslation();
  return (
    <DateInput>
      <GVTextField
        wide
        type="text"
        name="endDate"
        label={t("filters.date-range.end")}
        value={t<string>("filters.date-range.today")}
        disabled
      />
    </DateInput>
  );
};
const SecondInput = React.memo(_SecondInput);

const DateRangeFilterValues = React.memo(_DateRangeFilterValues);
export default DateRangeFilterValues;
