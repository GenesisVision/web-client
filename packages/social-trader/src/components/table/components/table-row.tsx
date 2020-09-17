import {
  $rowColor,
  $tableBackgroundSubColor
} from "components/gv-styles/gv-colors/gv-colors";
import * as React from "react";
import { ReactNode } from "react";
import styled from "styled-components";
import { cursorPointer, transition } from "utils/style/style-mixins";

interface Props {
  head?: boolean;
  onClick?: (e: React.MouseEvent<HTMLTableRowElement>) => void;
  className?: string;
  hoverable?: boolean;
  stripy?: boolean;
  children: ReactNode;
}

const Tr = styled.tr<{ hoverable?: boolean; stripy?: boolean; head?: boolean }>`
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

const TableRow: React.FC<Props> = ({
  head,
  hoverable = true,
  className = "",
  stripy,
  children,
  ...other
}) => (
  <Tr
    head={head}
    hoverable={hoverable}
    stripy={stripy}
    className={className}
    {...other}
  >
    {children}
  </Tr>
);

export default React.memo(TableRow);
