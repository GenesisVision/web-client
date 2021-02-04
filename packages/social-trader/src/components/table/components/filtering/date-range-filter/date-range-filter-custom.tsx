import Popover, {
    HORIZONTAL_POPOVER_POS,
    VERTICAL_POPOVER_POS
} from "components/popover/popover";
import { Row } from "components/row/row";
import { RowItem } from "components/row-item/row-item";
import useAnchor from "hooks/anchor.hook";
import useFlag from "hooks/flag.hook";
import * as React from "react";
import styled from "styled-components";

import FilterArrowIcon from "../filter-arrow-icon";
import {
    DATA_RANGE_FILTER_TYPES,
    DATE_RANGE_MAX_FILTER_NAME,
    DATE_RANGE_MIN_FILTER_NAME,
    IDataRangeFilterValue
} from "./date-range-filter.constants";
import DateRangeFilterDatesBase from "./date-range-filter-dates-base";

const Container = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
`;

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    [DATE_RANGE_MIN_FILTER_NAME]: string;
    [DATE_RANGE_MAX_FILTER_NAME]: string;
    handleChangeDate: (type: keyof IDataRangeFilterValue, date: string) => void;
    handleSubmit: () => void;
}

const _DateRangeFilterCustom: React.FC<Props> = ({
    handleSubmit,
    children,
    ...restProps
}) => {
    const [hover, setHover, setLeave] = useFlag();
    const { anchor, setAnchor, clearAnchor } = useAnchor();
    const applyChange = (): void => {
        handleSubmit();
        clearAnchor();
    };
    return (
        <>
            <Row>
                <RowItem>{children}</RowItem>
                <RowItem>
                    <Container
                        onClick={setAnchor}
                        onMouseEnter={setHover}
                        onMouseLeave={setLeave}
                    >
                        <FilterArrowIcon hover={hover} isOpen={anchor !== undefined} />
                    </Container>
                </RowItem>
            </Row>
            <Popover
                vertical={VERTICAL_POPOVER_POS.TOP}
                fixedVertical
                anchorEl={anchor}
                onClose={clearAnchor}
                horizontal={HORIZONTAL_POPOVER_POS.LEFT}
                noPadding
            >
                <DateRangeFilterDatesBase
                    {...restProps}
                    type={DATA_RANGE_FILTER_TYPES.CUSTOM}
                    handleSubmit={applyChange}
                    cancel={clearAnchor}
                />
            </Popover>
        </>
    );
};

const DateRangeFilterCustom = React.memo(_DateRangeFilterCustom);
export default DateRangeFilterCustom;
