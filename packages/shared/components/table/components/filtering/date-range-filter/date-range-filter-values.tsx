import { GVTextField } from "gv-react-components";
import * as moment from "moment";
import * as React from "react";
import { WithTranslation, withTranslation } from "react-i18next";
import GVDatePicker from "shared/components/gv-datepicker/gv-datepicker";

import {
  DATA_RANGE_FILTER_TYPES,
  DateRangeFilterTypes,
  IDataRangeFilterValue
} from "./date-range-filter.constants";

interface IDateRangeFilterValuesProps {
  onChange(type: keyof IDataRangeFilterValue, date: string): void;
  type: DATA_RANGE_FILTER_TYPES;
  dateStart: Date | number | string;
  dateEnd: Date | number | string;
  startLabel: string;
}

class DateRangeFilterValues extends React.Component<
  IDateRangeFilterValuesProps & WithTranslation
> {
  handleOnChange = (type: keyof IDataRangeFilterValue) => (
    e: React.ChangeEvent<any>
  ) => {
    this.props.onChange(type, e.target.value);
  };

  renderFirstInput = (value: string): JSX.Element => (
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
      case DateRangeFilterTypes.all:
        return (
          <React.Fragment>
            {this.renderFirstInput(startLabel)}
            {this.renderSecondInput()}
          </React.Fragment>
        );
      case DateRangeFilterTypes.lastMonth:
        return (
          <React.Fragment>
            {this.renderFirstInput(
              moment()
                .subtract(1, "month")
                .format("ll")
            )}
            {this.renderSecondInput()}
          </React.Fragment>
        );
      case DateRangeFilterTypes.lastWeek:
        return (
          <React.Fragment>
            {this.renderFirstInput(
              moment()
                .subtract(1, "week")
                .format("ll")
            )}
            {this.renderSecondInput()}
          </React.Fragment>
        );
      case DateRangeFilterTypes.custom:
      default:
        return (
          <React.Fragment>
            <GVTextField
              wrapperClassName="date-range-filter__date-input"
              type="text"
              name="dateStart"
              label={t("filters.date-range.start")}
              value={dateStart}
              InputComponent={GVDatePicker}
              horizontal="right"
              maxDate={new Date()}
              onChange={this.handleOnChange("dateStart")}
            />
            <GVTextField
              wrapperClassName="date-range-filter__date-input"
              type="text"
              name="dateEnd"
              label={t("filters.date-range.end")}
              value={dateEnd}
              horizontal="right"
              InputComponent={GVDatePicker}
              minDate={dateStart}
              maxDate={new Date()}
              onChange={this.handleOnChange("dateEnd")}
            />
          </React.Fragment>
        );
    }
  }
}

export default withTranslation()(DateRangeFilterValues);
