import moment, { MomentInput } from "moment";
import * as React from "react";
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

class DateRangeFilterValues extends React.PureComponent<
  IDateRangeFilterValuesProps & InjectedTranslateProps
> {
  handleOnChange = (type: keyof IDataRangeFilterValue) => (
    e: React.ChangeEvent<any>
  ) => {
    this.props.onChange(type, e.target.value);
  };

  renderFirstInput = (value: string): JSX.Element => (
    //@ts-ignore TODO сделать фикс GVTextField
    <GVTextField
      wrapperClassName="date-range-filter__date-input"
      type="text"
      name="startDate"
      label={this.props.t("filters.date-range.start")}
      value={value}
      disabled
    />
  );

  renderSecondInput = (): JSX.Element => (
    //@ts-ignore TODO сделать фикс GVTextField
    <GVTextField
      wrapperClassName="date-range-filter__date-input"
      type="text"
      name="endDate"
      label={this.props.t("filters.date-range.end")}
      value={this.props.t("filters.date-range.today")}
      disabled
    />
  );

  render() {
    const { t, type, dateStart, dateEnd, startLabel } = this.props;
    switch (type) {
      case DATA_RANGE_FILTER_TYPES.ALL:
        return (
          <>
            {this.renderFirstInput(startLabel)}
            {this.renderSecondInput()}
          </>
        );
      case DATA_RANGE_FILTER_TYPES.LAST_MOUTH:
        return (
          <>
            {this.renderFirstInput(
              moment()
                .subtract(1, "month")
                .format("ll")
            )}
            {this.renderSecondInput()}
          </>
        );
      case DATA_RANGE_FILTER_TYPES.LAST_WEEK:
        return (
          <>
            {this.renderFirstInput(
              moment()
                .subtract(1, "week")
                .format("ll")
            )}
            {this.renderSecondInput()}
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
                onChange={this.handleOnChange("dateStart")}
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
                onChange={this.handleOnChange("dateEnd")}
              />
            }
          </>
        );
    }
  }
}

export default translate()(DateRangeFilterValues);
