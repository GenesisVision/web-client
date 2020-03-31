import classNames from "classnames";
import { HORIZONTAL_POPOVER_POS } from "components/popover/popover";
import Tooltip from "components/tooltip/tooltip";
import { TooltipContent } from "components/tooltip/tooltip-content";
import * as React from "react";

export const TooltipLabel: React.FC<{
  tooltipContent: string | JSX.Element;
  labelText?: string;
  className?: string;
}> = React.memo(({ tooltipContent, labelText, className }) => (
  <Tooltip
    horizontal={HORIZONTAL_POPOVER_POS.LEFT}
    render={() => <TooltipContent>{tooltipContent}</TooltipContent>}
  >
    <span
      className={classNames(
        "tooltip__label",
        {
          "tooltip__label--question": !labelText
        },
        className
      )}
    >
      {labelText ? labelText : "?"}
    </span>
  </Tooltip>
));
