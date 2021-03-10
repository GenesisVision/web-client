import { Button } from "components/button/button";
import { Center } from "components/center/center";
import { PopoverContentCardBlock } from "components/popover/popover-card.block";
import { Row } from "components/row/row";
import { RowItem } from "components/row-item/row-item";
import { FilterTitle } from "components/table/components/filtering/filter-title";
import * as React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { mediaBreakpointLandscapePhone } from "utils/style/media";

import {
    DATA_RANGE_FILTER_TYPES,
    DATE_RANGE_MAX_FILTER_NAME,
    DATE_RANGE_MIN_FILTER_NAME,
    IDataRangeFilterValue
} from "./date-range-filter.constants";
import DateRangeFilterValues from "./date-range-filter-values";

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

interface Props {
    type: DATA_RANGE_FILTER_TYPES;
    [DATE_RANGE_MIN_FILTER_NAME]?: string;
    [DATE_RANGE_MAX_FILTER_NAME]?: string;
    minDate?: Date;
    startLabel?: string;
    cancel?: () => void;
    handleChangeDate: (type: keyof IDataRangeFilterValue, date: string) => void;
    handleSubmit: () => void;
}

const _DateRangeFilterDatesBase: React.FC<Props> = ({
    handleChangeDate,
    handleSubmit,
    cancel,
    ...restProps
}) => {
    const [t] = useTranslation();
    return (
        <Dates>
            <FilterTitle>{t("filters.date-range.label")}</FilterTitle>
            <Values>
                <DateRangeFilterValues {...restProps} onChange={handleChangeDate} />
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
    );
};

const DateRangeFilterDatesBase = React.memo(_DateRangeFilterDatesBase);
export default DateRangeFilterDatesBase;
