import GVButton from "components/gv-button";
import dayjs from "dayjs";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";

import DateRangeFilterValues from "./date-range-filter-values";
import {
  DATA_RANGE_FILTER_TYPES,
  IDataRangeFilterValue
} from "./date-range-filter.constants";

const subtract: { [keys: string]: "month" | "week" } = {
  [DATA_RANGE_FILTER_TYPES.LAST_MONTH]: "month",
  [DATA_RANGE_FILTER_TYPES.LAST_WEEK]: "week"
};

class _DateRangeFilterPopover extends React.PureComponent<Props, State> {
  state = {
    type: this.props.value
      ? this.props.value.type
      : DATA_RANGE_FILTER_TYPES.ALL,
    dateStart: this.props.value ? this.props.value.dateStart : undefined,
    dateEnd: this.props.value ? this.props.value.dateEnd : undefined
  };

  getDateStart = (type: DATA_RANGE_FILTER_TYPES) => {
    switch (type) {
      case DATA_RANGE_FILTER_TYPES.ALL:
        return dayjs(0).format("YYYY-MM-DD");
      default:
        return dayjs()
          .subtract(1, subtract[type])
          .format("YYYY-MM-DD");
    }
  };
  handleChangeType = (type: DATA_RANGE_FILTER_TYPES) => () => {
    this.setState({
      type,
      dateStart: this.getDateStart(type),
      dateEnd: dayjs().format("YYYY-MM-DD")
    });
  };
  handleChangeDate = (type: keyof IDataRangeFilterValue, date: string) => {
    this.setState({ [type]: date } as Pick<State, keyof State>);
  };
  handleSubmit = () => {
    if (this.props.changeFilter) {
      this.props.changeFilter(this.state);
    }
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
            onClick={this.handleChangeType(DATA_RANGE_FILTER_TYPES.LAST_MONTH)}
            disabled={type === DATA_RANGE_FILTER_TYPES.LAST_MONTH}
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

interface OwnProps {
  value?: IDataRangeFilterValue;
  changeFilter?(value: IDataRangeFilterValue): void;
  startLabel: string;
  cancel?(): void;
}

interface Props extends OwnProps, WithTranslation {}

interface State extends IDataRangeFilterValue {}

const DateRangeFilterPopover = translate()(_DateRangeFilterPopover);
export default DateRangeFilterPopover;
