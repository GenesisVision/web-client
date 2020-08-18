import { $textColor } from "components/gv-styles/gv-colors/gv-colors";
import { HORIZONTAL_POPOVER_POS } from "components/popover/popover";
import Tooltip from "components/tooltip/tooltip";
import { TooltipContent } from "components/tooltip/tooltip-content";
import { withStyles } from "decorators/withStyles";
import * as React from "react";
import { useCallback } from "react";
import { css } from "styled-components";

interface Props {
  pointer?: boolean;
  tooltipContent: string | JSX.Element;
  labelText?: string;
  className?: string;
}

const style = css`
  cursor: ${({ pointer }: Props) => (pointer ? "pointer" : "help")};
  ${({ labelText }: Props) =>
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
  ({ pointer, tooltipContent, labelText, className }) => {
    const tooltipRender = useCallback(
      () => <TooltipContent>{tooltipContent}</TooltipContent>,
      [tooltipContent]
    );
    return (
      <Tooltip horizontal={HORIZONTAL_POPOVER_POS.LEFT} render={tooltipRender}>
        <span className={className}>{labelText ? labelText : "?"}</span>
      </Tooltip>
    );
  }
);

export const TooltipLabel = withStyles<Props>({ dynamicStyles: style })(
  _TooltipLabel
);
