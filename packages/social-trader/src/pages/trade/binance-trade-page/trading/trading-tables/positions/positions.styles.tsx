import { TableCell } from "components/table/components";
import styled, { css } from "styled-components";

const $columnWidth = 100;

interface PositionProps {
  width?: number;
}

const positionStyle = css`
  ${({ width = $columnWidth }: PositionProps) => css`
    width: ${width}px;
    min-width: ${width}px;
    max-width: ${width}px;
  `}
  box-sizing: border-box;
`;

export const StyledTh = styled.th`
  ${positionStyle}
`;

export const StyledTableCell = styled(TableCell)<PositionProps>`
  ${positionStyle}
`;

export const LeverageBadge = styled.div`
  color: rgb(240, 185, 11);
  background-color: rgb(54, 50, 29);
  font-size: 12px;
  margin-left: 4px;
  border-radius: 2px;
  padding-left: 4px;
  padding-right: 4px;
`;

export const CloseTableCell = styled(TableCell)`
  min-width: 300px;
  box-sizing: border-box;
`;
