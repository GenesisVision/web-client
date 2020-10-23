import { Button } from "components/button/button";
import { Center } from "components/center/center";
import { PopoverContentCardBlock } from "components/popover/popover-card.block";
import { PopoverContent } from "components/popover/popover-content";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { FilterTitle } from "components/table/components/filtering/filter-title";
import dayjs from "dayjs";
import * as React from "react";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { $textDarkColor } from "utils/style/colors";
import { mediaBreakpointLandscapePhone } from "utils/style/media";
import { fontSize } from "utils/style/mixins";
import { $fontSizeParagraph } from "utils/style/sizes";
import { Clickable } from "utils/types";

import DateRangeFilterValues from "./date-range-filter-values";
import {
  DATA_RANGE_FILTER_TYPES,
  DATE_RANGE_MAX_FILTER_NAME,
  DATE_RANGE_MIN_FILTER_NAME,
  IDataRangeFilterValue
} from "./date-range-filter.constants";

interface Props {
  value?: IDataRangeFilterValue;
  changeFilter?: (value: IDataRangeFilterValue) => void;
  startLabel: string;
  cancel?: () => void;
}

interface IDateRangeItemProps extends Clickable {
  disabled: boolean;
  label: string;
}

const subtract: { [keys: string]: "month" | "week" } = {
  [DATA_RANGE_FILTER_TYPES.LAST_MONTH]: "month",
  [DATA_RANGE_FILTER_TYPES.LAST_WEEK]: "week"
};

const getDateStart = (type: DATA_RANGE_FILTER_TYPES) => {
  switch (type) {
    case DATA_RANGE_FILTER_TYPES.ALL:
      return dayjs(0).toISOString();
    default:
      return dayjs()
        .subtract(1, subtract[type])
        .toISOString();
  }
};

const StyledButton = styled(Button)`
  ${fontSize($fontSizeParagraph)};
  &:not(:disabled) {
    color: ${$textDarkColor};
  }
  &:disabled {
    opacity: 1;
  }
`;

const DateRangeItem: React.FC<IDateRangeItemProps> = React.memo(
  ({ onClick, disabled, label }) => {
    return (
      <Row>
        <StyledButton
          noPadding
          variant="text"
          color="secondary"
          onClick={onClick}
          disabled={disabled}
        >
          {label}
        </StyledButton>
      </Row>
    );
  }
);

const Container = styled(PopoverContent)`
  display: flex;
`;

const TypeBlock = styled(PopoverContentCardBlock)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

const Dates = styled(PopoverContentCardBlock)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Values = styled(Center)`
  flex-wrap: wrap;
  ${mediaBreakpointLandscapePhone(`
      flex-wrap:nowrap;
  `)}
`;

const _DateRangeFilterPopover: React.FC<Props> = ({
  changeFilter,
  value,
  startLabel,
  cancel
}) => {
  const [t] = useTranslation();
  const [state, setState] = useState({
    type: value ? value.type : DATA_RANGE_FILTER_TYPES.ALL,
    [DATE_RANGE_MIN_FILTER_NAME]: value
      ? value[DATE_RANGE_MIN_FILTER_NAME]
      : undefined,
    [DATE_RANGE_MAX_FILTER_NAME]: value
      ? value[DATE_RANGE_MAX_FILTER_NAME]
      : undefined
  });

  const handleChangeType = useCallback(
    (type: DATA_RANGE_FILTER_TYPES) => () => {
      setState({
        type,
        [DATE_RANGE_MIN_FILTER_NAME]: getDateStart(type),
        [DATE_RANGE_MAX_FILTER_NAME]: dayjs().toISOString()
      });
    },
    []
  );

  const handleChangeDate = useCallback(
    (type: keyof IDataRangeFilterValue, date: string) => {
      setState({ ...state, [type]: date });
    },
    [state]
  );

  const handleSubmit = useCallback(() => {
    if (!changeFilter) return;
    changeFilter({
      type: state.type,
      [DATE_RANGE_MIN_FILTER_NAME]:
        String(state[DATE_RANGE_MIN_FILTER_NAME]).length === 0
          ? dayjs(0).toISOString()
          : state[DATE_RANGE_MIN_FILTER_NAME],
      [DATE_RANGE_MAX_FILTER_NAME]:
        String(state[DATE_RANGE_MAX_FILTER_NAME]).length === 0
          ? dayjs().toISOString()
          : state[DATE_RANGE_MAX_FILTER_NAME]
    });
  }, [changeFilter, state]);

  return (
    <Container>
      <TypeBlock dark>
        <DateRangeItem
          onClick={handleChangeType(DATA_RANGE_FILTER_TYPES.ALL)}
          disabled={state.type === DATA_RANGE_FILTER_TYPES.ALL}
          label={t("filters.date-range.all-time")}
        />
        <DateRangeItem
          onClick={handleChangeType(DATA_RANGE_FILTER_TYPES.LAST_MONTH)}
          disabled={state.type === DATA_RANGE_FILTER_TYPES.LAST_MONTH}
          label={t("filters.date-range.last-month")}
        />
        <DateRangeItem
          onClick={handleChangeType(DATA_RANGE_FILTER_TYPES.LAST_WEEK)}
          disabled={state.type === DATA_RANGE_FILTER_TYPES.LAST_WEEK}
          label={t("filters.date-range.last-week")}
        />
        <DateRangeItem
          onClick={handleChangeType(DATA_RANGE_FILTER_TYPES.CUSTOM)}
          disabled={state.type === DATA_RANGE_FILTER_TYPES.CUSTOM}
          label={t("filters.date-range.custom")}
        />
      </TypeBlock>
      <Dates>
        <FilterTitle>{t("filters.date-range.label")}</FilterTitle>
        <Values>
          <DateRangeFilterValues
            {...state}
            onChange={handleChangeDate}
            startLabel={startLabel}
          />
        </Values>
        <Row>
          <RowItem>
            <Button
              size={"xlarge"}
              noPadding
              variant="text"
              onClick={handleSubmit}
            >
              {t("buttons.apply")}
            </Button>
          </RowItem>
          <RowItem>
            <Button
              size={"xlarge"}
              noPadding
              variant="text"
              color="secondary"
              onClick={cancel}
            >
              {t("buttons.cancel")}
            </Button>
          </RowItem>
        </Row>
      </Dates>
    </Container>
  );
};

const DateRangeFilterPopover = React.memo(_DateRangeFilterPopover);
export default DateRangeFilterPopover;
