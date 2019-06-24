import classNames from "classnames";
import * as React from "react";
import { HORIZONTAL_POPOVER_POS } from "shared/components/popover/popover";
import Tooltip from "shared/components/tooltip/tooltip";

export const TooltipLabel: React.FC<{
  tooltipContent: string;
  labelText?: string;
  className?: string;
}> = React.memo(({ tooltipContent, labelText = "?", className }) => (
  <Tooltip
    horizontal={HORIZONTAL_POPOVER_POS.LEFT}
    render={() => <div className="tooltip__content">{tooltipContent}</div>}
  >
    <span
      className={classNames(
        "tooltip__label",
        {
          "tooltip__label--help": !labelText
        },
        className
      )}
    >
      {labelText}
    </span>
  </Tooltip>
));
