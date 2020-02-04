import "./tooltip.scss";

import { PopoverContentCardBlock } from "components/popover/popover-card.block";
import React from "react";

const _TooltipContent: React.FC<{ fixed?: boolean } & React.HTMLAttributes<
  HTMLDivElement
>> = ({ children, fixed = true }) => {
  return (
    <PopoverContentCardBlock size={"small"} fixed={fixed}>
      {children}
    </PopoverContentCardBlock>
  );
};

export const TooltipContent = React.memo(_TooltipContent);
