import classNames from "classnames";
import { HORIZONTAL_POPOVER_POS } from "components/popover/popover";
import Tooltip from "components/tooltip/tooltip";
import * as React from "react";

export const TooltipLabel: React.FC<{
  tooltipContent: string;
  labelText?: string;
  className?: string;
}> = React.memo(({ tooltipContent, labelText, className }) => (
  <Tooltip
    horizontal={HORIZONTAL_POPOVER_POS.LEFT}
    render={() => <div className="tooltip__content">{tooltipContent}</div>}
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
