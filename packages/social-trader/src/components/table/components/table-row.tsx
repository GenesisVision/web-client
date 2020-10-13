import * as React from "react";
import { ReactNode } from "react";
import styled from "styled-components";
import { $rowColor, $tableBackgroundSubColor } from "utils/style/colors";
import { cursorPointer, transition } from "utils/style/mixins";

interface Props {
  head?: boolean;
  onClick?: (e: React.MouseEvent<HTMLTableRowElement>) => void;
  className?: string;
  hoverable?: boolean;
  stripy?: boolean;
  children: ReactNode;
}

const TableRow = styled.tr<Props>`
  ${transition("background-color")}
  ${cursorPointer}
   ${({ hoverable = true, stripy, head }) => {
     if (stripy)
       return `
        &:nth-child(2n + 1) {
          background: ${$tableBackgroundSubColor};
        }
     `;
     if (hoverable && !head)
       return `
        &:hover {
          background:${$rowColor};
        }
     `;
   }}
`;

export default React.memo(TableRow);
