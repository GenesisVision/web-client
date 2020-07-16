import clsx from "clsx";
import { HORIZONTAL_POPOVER_POS } from "components/popover/popover";
import Tooltip from "components/tooltip/tooltip";
import { TooltipContent } from "components/tooltip/tooltip-content";
import * as React from "react";
import { useCallback } from "react";

import styles from "./tooltip-label.module.scss";

export const TooltipLabel: React.FC<{
  pointer?: boolean;
  tooltipContent: string | JSX.Element;
  labelText?: string;
  className?: string;
}> = React.memo(({ pointer, tooltipContent, labelText, className }) => {
  const tooltipRender = useCallback(
    () => <TooltipContent>{tooltipContent}</TooltipContent>,
    [tooltipContent]
  );
  return (
    <Tooltip horizontal={HORIZONTAL_POPOVER_POS.LEFT} render={tooltipRender}>
      <span
        className={clsx(
          styles["tooltip-label"],
          {
            [styles["tooltip-label--cursor-pointer"]]: pointer,
            [styles["tooltip-label--question"]]: !labelText
          },
          className
        )}
      >
        {labelText ? labelText : "?"}
      </span>
    </Tooltip>
  );
});
