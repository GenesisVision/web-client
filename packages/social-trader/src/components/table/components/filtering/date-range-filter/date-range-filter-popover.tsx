import { Center } from "components/center/center";
import GVButton from "components/gv-button";
import { PopoverContentCardBlock } from "components/popover/popover-card.block";
import { PopoverContent } from "components/popover/popover-content";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { FilterTitle } from "components/table/components/filtering/filter-title";
import dayjs from "dayjs";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";

import DateRangeFilterValues from "./date-range-filter-values";
import {
  DATA_RANGE_FILTER_TYPES,
  DATE_RANGE_MAX_FILTER_NAME,
  DATE_RANGE_MIN_FILTER_NAME,
  IDataRangeFilterValue
} from "./date-range-filter.constants";
import styles from "./date-range-filter.module.scss";

const subtract: { [keys: string]: "month" | "week" } = {
  [DATA_RANGE_FILTER_TYPES.LAST_MONTH]: "month",
  [DATA_RANGE_FILTER_TYPES.LAST_WEEK]: "week"
};

const DateRangeItem: React.FC<{
  onClick: VoidFunction;
  disabled: boolean;
  label: string;
}> = React.memo(({ onClick, disabled, label }) => {
  return (
    <Row>
      <GVButton
        className={styles["date-range-filter__type-btn"]}
        noPadding
        variant="text"
        color="secondary"
        onClick={onClick}
        disabled={disabled}
      >
        {label}
      </GVButton>
    </Row>
  );
});

class _DateRangeFilterPopover extends React.PureComponent<Props, State> {
  state = {
    type: this.props.value
      ? this.props.value.type
      : DATA_RANGE_FILTER_TYPES.ALL,
    [DATE_RANGE_MIN_FILTER_NAME]: this.props.value
      ? this.props.value[DATE_RANGE_MIN_FILTER_NAME]
      : undefined,
    [DATE_RANGE_MAX_FILTER_NAME]: this.props.value
      ? this.props.value[DATE_RANGE_MAX_FILTER_NAME]
      : undefined
  };

  getDateStart = (type: DATA_RANGE_FILTER_TYPES) => {
    switch (type) {
      case DATA_RANGE_FILTER_TYPES.ALL:
        return dayjs(0).toISOString();
      default:
        return dayjs()
          .subtract(1, subtract[type])
          .toISOString();
    }
  };
  handleChangeType = (type: DATA_RANGE_FILTER_TYPES) => () => {
    this.setState({
      type,
      [DATE_RANGE_MIN_FILTER_NAME]: this.getDateStart(type),
      [DATE_RANGE_MAX_FILTER_NAME]: dayjs().toISOString()
    });
  };
  handleChangeDate = (type: keyof IDataRangeFilterValue, date: string) => {
    this.setState({ [type]: date } as Pick<State, keyof State>);
  };
  handleSubmit = () => {
    if (this.props.changeFilter) {
      this.props.changeFilter({
        type: this.state.type,
        [DATE_RANGE_MIN_FILTER_NAME]:
          String(this.state[DATE_RANGE_MIN_FILTER_NAME]).length === 0
            ? dayjs(0).toISOString()
            : this.state[DATE_RANGE_MIN_FILTER_NAME],
        [DATE_RANGE_MAX_FILTER_NAME]:
          String(this.state[DATE_RANGE_MAX_FILTER_NAME]).length === 0
            ? dayjs().toISOString()
            : this.state[DATE_RANGE_MAX_FILTER_NAME]
      });
    }
  };

  render() {
    const { type } = this.state;
    const { t, startLabel, cancel } = this.props;
    return (
      <PopoverContent className={styles["date-range-filter"]}>
        <PopoverContentCardBlock
          dark
          className={styles["date-range-filter__type"]}
        >
          <DateRangeItem
            onClick={this.handleChangeType(DATA_RANGE_FILTER_TYPES.ALL)}
            disabled={type === DATA_RANGE_FILTER_TYPES.ALL}
            label={t("filters.date-range.all-time")}
          />
          <DateRangeItem
            onClick={this.handleChangeType(DATA_RANGE_FILTER_TYPES.LAST_MONTH)}
            disabled={type === DATA_RANGE_FILTER_TYPES.LAST_MONTH}
            label={t("filters.date-range.last-month")}
          />
          <DateRangeItem
            onClick={this.handleChangeType(DATA_RANGE_FILTER_TYPES.LAST_WEEK)}
            disabled={type === DATA_RANGE_FILTER_TYPES.LAST_WEEK}
            label={t("filters.date-range.last-week")}
          />
          <DateRangeItem
            onClick={this.handleChangeType(DATA_RANGE_FILTER_TYPES.CUSTOM)}
            disabled={type === DATA_RANGE_FILTER_TYPES.CUSTOM}
            label={t("filters.date-range.custom")}
          />
        </PopoverContentCardBlock>
        <PopoverContentCardBlock className={styles["date-range-filter__dates"]}>
          <FilterTitle>{t("filters.date-range.label")}</FilterTitle>
          <Center className={styles["date-range-filter__values"]}>
            <DateRangeFilterValues
              {...this.state}
              onChange={this.handleChangeDate}
              startLabel={startLabel}
            />
          </Center>
          <Row>
            <RowItem>
              <GVButton
                size={"xlarge"}
                noPadding
                variant="text"
                onClick={this.handleSubmit}
              >
                {t("buttons.apply")}
              </GVButton>
            </RowItem>
            <RowItem>
              <GVButton
                size={"xlarge"}
                noPadding
                variant="text"
                color="secondary"
                onClick={cancel}
              >
                {t("buttons.cancel")}
              </GVButton>
            </RowItem>
          </Row>
        </PopoverContentCardBlock>
      </PopoverContent>
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
