import Popover, {
  HORIZONTAL_POPOVER_POS,
  VERTICAL_POPOVER_POS
} from "components/popover/popover";
import { RowItem } from "components/row-item/row-item";
import { Text } from "components/text/text";
import useAnchor from "hooks/anchor.hook";
import useFlag from "hooks/flag.hook";
import * as React from "react";
import { useCallback } from "react";
import styled from "styled-components";
import { $textAccentColor } from "utils/style/colors";
import { fontSize } from "utils/style/mixins";
import { $fontSizeCommon, $paddingXxxsmall } from "utils/style/sizes";

import { UpdateFilterFunc } from "../table.types";
import FilterArrowIcon from "./filter-arrow-icon";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: any;
  renderValueText(value: any): string;
  updateFilter?: UpdateFilterFunc;
  name: string;
}

const Container = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  ${fontSize($fontSizeCommon)};
`;
const Value = styled.div`
  letter-spacing: 0.2px;
  color: ${$textAccentColor};
  padding: 0 ${$paddingXxxsmall}px;
  white-space: nowrap;
`;

const _Filter: React.FC<Props> = ({
  label,
  value,
  renderValueText,
  children,
  updateFilter,
  name
}) => {
  const [hover, setHover, setLeave] = useFlag();
  const { anchor, setAnchor, clearAnchor } = useAnchor();
  const handleChangeFilter = useCallback(
    (value: any) => {
      clearAnchor();
      updateFilter && updateFilter({ name, value });
    },
    [updateFilter, name]
  );
  const child = React.cloneElement(children as React.ReactElement, {
    value,
    changeFilter: handleChangeFilter,
    cancel: clearAnchor
  });
  return (
    <RowItem>
      <Container
        onMouseEnter={setHover}
        onMouseLeave={setLeave}
        onClick={setAnchor}
      >
        <Text muted>{label}</Text>
        <Value>{renderValueText(value)}</Value>
        <FilterArrowIcon hover={hover} isOpen={anchor !== undefined} />
      </Container>
      <Popover
        vertical={VERTICAL_POPOVER_POS.BOTTOM}
        fixedVertical
        anchorEl={anchor}
        onClose={clearAnchor}
        horizontal={HORIZONTAL_POPOVER_POS.RIGHT}
        noPadding
      >
        {child}
      </Popover>
    </RowItem>
  );
};

const Filter = React.memo(_Filter);
export default Filter;
