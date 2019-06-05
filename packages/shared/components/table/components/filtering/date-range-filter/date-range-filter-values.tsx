import moment, { MomentInput } from "moment";
import React, { useCallback } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import GVDatePicker from "shared/components/gv-datepicker/gv-datepicker";
import GVTextField from "shared/components/gv-text-field";

import {
  DATA_RANGE_FILTER_TYPES,
  IDataRangeFilterValue
} from "./date-range-filter.constants";

interface IDateRangeFilterValuesProps {
  onChange(type: keyof IDataRangeFilterValue, date: string): void;
  type: DATA_RANGE_FILTER_TYPES;
  dateStart: MomentInput;
  dateEnd: MomentInput;
  startLabel: string;
}

const _DateRangeFilterValues: React.FC<
  IDateRangeFilterValuesProps & InjectedTranslateProps
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
    case DATA_RANGE_FILTER_TYPES.LAST_MOUTH:
      return (
        <>
          <FirstInput
            value={moment()
              .subtract(1, "month")
              .format("ll")}
          />
          <SecondInput />
        </>
      );
    case DATA_RANGE_FILTER_TYPES.LAST_WEEK:
      return (
        <>
          <FirstInput
            value={moment()
              .subtract(1, "week")
              .format("ll")}
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

const _FirstInput: React.FC<{ value: string } & InjectedTranslateProps> = ({
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
const FirstInput = React.memo(translate()(_FirstInput));

const _SecondInput: React.FC<InjectedTranslateProps> = ({ t }) => (
  <GVTextField
    wrapperClassName="date-range-filter__date-input"
    type="text"
    name="endDate"
    label={t("filters.date-range.end")}
    value={t("filters.date-range.today")}
    disabled
  />
);
const SecondInput = React.memo(translate()(_SecondInput));

const DateRangeFilterValues = React.memo(translate()(_DateRangeFilterValues));
export default DateRangeFilterValues;
