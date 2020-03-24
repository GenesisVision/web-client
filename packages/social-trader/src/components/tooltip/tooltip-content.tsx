import "./tooltip-content.scss";

import classNames from "classnames";
import { PopoverContentCardBlock } from "components/popover/popover-card.block";
import React from "react";

const _TooltipContent: React.FC<Props> = ({
  small,
  children,
  fixed = true
}) => {
  return (
    <PopoverContentCardBlock size={"small"} fixed={fixed}>
      <div
        className={classNames("tooltip-content", {
          "tooltip-content--small": small
        })}
      >
        {children}
      </div>
    </PopoverContentCardBlock>
  );
};

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  small?: boolean;
  fixed?: boolean;
}

export const TooltipContent = React.memo(_TooltipContent);
