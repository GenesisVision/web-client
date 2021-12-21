import {
  HORIZONTAL_POPOVER_POS,
  VERTICAL_POPOVER_POS
} from "components/popover/popover";
import Tooltip from "components/tooltip/tooltip";
import { TooltipContent } from "components/tooltip/tooltip-content";
import * as React from "react";
import { useCallback } from "react";
import styled from "styled-components";
import { $textColor } from "utils/style/colors";

interface Props {
  tooltipContent: string | JSX.Element;
  pointer?: boolean;
  labelText?: string;
  vertical?: VERTICAL_POPOVER_POS;
}

const StyledSpan = styled.span<{ pointer?: boolean; labelText?: string }>`
  cursor: ${({ pointer }) => (pointer ? "pointer" : "help")};
  ${({ labelText }) =>
    !labelText &&
    `
    box-sizing: border-box;
    border: 1px solid ${$textColor};
    border-radius: 100%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 15px;
    height: 15px;
    font-size: 8px;
    line-height: 15px;
    color: ${$textColor};`};
`;

const _TooltipLabel: React.FC<Props> = React.memo(
  ({
    pointer,
    tooltipContent,
    labelText,
    vertical = VERTICAL_POPOVER_POS.TOP
  }) => {
    const tooltipRender = useCallback(
      () => <TooltipContent>{tooltipContent}</TooltipContent>,
      [tooltipContent]
    );
    return (
      <Tooltip
        horizontal={HORIZONTAL_POPOVER_POS.LEFT}
        vertical={vertical}
        render={tooltipRender}
      >
        <StyledSpan pointer={pointer} labelText={labelText}>
          {labelText ? labelText : "?"}
        </StyledSpan>
      </Tooltip>
    );
  }
);

export const TooltipLabel = React.memo(_TooltipLabel);
