import { GVButton } from "gv-react-components";
import * as moment from "moment";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";

import DateRangeFilterValues from "./date-range-filter-values";
import {
  DATA_RANGE_FILTER_TYPES,
  IDataRangeFilterValue
} from "./date-range-filter.constants";

interface IDateRangeFilterPopoverProps {
  value?: IDataRangeFilterValue;
  changeFilter?(value: IDataRangeFilterValue): void;
  startLabel?: string;
  cancel?(): void;
}

class DateRangeFilterPopover extends React.Component<
  IDateRangeFilterPopoverProps & InjectedTranslateProps,
  IDataRangeFilterValue & { [key: string]: any }
> {
  state = {
    type: this.props.value.type,
    dateStart: this.props.value.dateStart,
    dateEnd: this.props.value.dateEnd
  };

  handleChangeType = (type: DATA_RANGE_FILTER_TYPES) => () => {
    this.setState({
      type,
      dateStart: moment()
        .subtract(1, "day")
        .format("YYYY-MM-DD"),
      dateEnd: moment().format("YYYY-MM-DD")
    });
  };
  handleChangeDate = (type: keyof IDataRangeFilterValue, date: string) => {
    this.setState({ [type]: date });
  };
  handleSubmit = () => {
    this.props.changeFilter(this.state);
  };

  render() {
    const { type } = this.state;
    const { t, startLabel, cancel } = this.props;
    return (
      <div className="date-range-filter">
        <div className="date-range-filter__type">
          <GVButton
            className="date-range-filter__btn date-range-filter__btn--type"
            variant="text"
            color="secondary"
            onClick={this.handleChangeType(DATA_RANGE_FILTER_TYPES.ALL)}
            disabled={type === DATA_RANGE_FILTER_TYPES.ALL}
          >
            {t("filters.date-range.all-time")}
          </GVButton>
          <GVButton
            className="date-range-filter__btn date-range-filter__btn--type"
            variant="text"
            color="secondary"
            onClick={this.handleChangeType(DATA_RANGE_FILTER_TYPES.LAST_MOUTH)}
            disabled={type === DATA_RANGE_FILTER_TYPES.LAST_MOUTH}
          >
            {t("filters.date-range.last-month")}
          </GVButton>
          <GVButton
            className="date-range-filter__btn date-range-filter__btn--type"
            variant="text"
            color="secondary"
            onClick={this.handleChangeType(DATA_RANGE_FILTER_TYPES.LAST_WEEK)}
            disabled={type === DATA_RANGE_FILTER_TYPES.LAST_WEEK}
          >
            {t("filters.date-range.last-week")}
          </GVButton>
          <GVButton
            className="date-range-filter__btn date-range-filter__btn--type"
            variant="text"
            color="secondary"
            onClick={this.handleChangeType(DATA_RANGE_FILTER_TYPES.CUSTOM)}
            disabled={type === DATA_RANGE_FILTER_TYPES.CUSTOM}
          >
            {t("filters.date-range.custom")}
          </GVButton>
        </div>
        <div className="date-range-filter__dates">
          <div className="date-range-filter__title">
            {t("filters.date-range.label")}
          </div>
          <div className="date-range-filter__values">
            <DateRangeFilterValues
              {...this.state}
              onChange={this.handleChangeDate}
              startLabel={startLabel}
            />
          </div>
          <div className="date-range-filter__btns">
            <GVButton
              className="date-range-filter__btn"
              variant="text"
              onClick={this.handleSubmit}
            >
              {t("buttons.apply")}
            </GVButton>
            <GVButton
              className="date-range-filter__btn"
              variant="text"
              color="secondary"
              onClick={cancel}
            >
              {t("buttons.cancel")}
            </GVButton>
          </div>
        </div>
      </div>
    );
  }
}

export default translate()(DateRangeFilterPopover);
