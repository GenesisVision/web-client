import styled, { css } from "styled-components";
import { TableCell } from "components/table/components";

const $columnWidth = "100px";

const positionStyle = css`
  width: ${$columnWidth};
  min-width: ${$columnWidth};
  max-width: ${$columnWidth};
  box-sizing: border-box;
`;

export const StyledTh = styled.th`
  ${positionStyle}
`;

export const StyledTableCell = styled(TableCell)`
  ${positionStyle}
`;

export const CloseTableCell = styled(TableCell)`
  min-width: 300px;
  box-sizing: border-box;
`;
