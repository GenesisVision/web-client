import { SortableIcon } from "components/table/components/sortable-icon";
import {
  tableCellFirstOffsetStyle,
  tableCellStyle
} from "components/table/components/table-cell";
import { Text } from "components/text/text";
import * as React from "react";
import styled from "styled-components";
import { adaptivePadding, verticalPaddings } from "utils/style/mixins";
import { $paddingSmall, $paddingXsmall } from "utils/style/sizes";

import { SORTING_DIRECTION } from "../helpers/sorting.helpers";

interface ITableHeadCellProps extends React.HTMLAttributes<HTMLDivElement> {
  sortable: boolean;
  sortingDirection: SORTING_DIRECTION;
  className?: string;
}

const StyledTh = styled.th`
  ${tableCellStyle}
  ${tableCellFirstOffsetStyle}
  ${verticalPaddings($paddingXsmall)}
  ${adaptivePadding("right", $paddingSmall / 2)};
  &:last-child {
    ${adaptivePadding("right", $paddingSmall)};
  }
`;

const _TableHeadCell: React.FC<ITableHeadCellProps> = ({
  sortable,
  sortingDirection,
  className,
  onClick,
  children
}) => {
  return (
    <StyledTh className={className} onClick={sortable ? onClick : undefined}>
      {sortable ? (
        <SortableIcon sortingDirection={sortingDirection}>
          {children}
        </SortableIcon>
      ) : (
        <Text muted>{children}</Text>
      )}
    </StyledTh>
  );
};

const TableHeadCell = React.memo(_TableHeadCell);
export default TableHeadCell;
