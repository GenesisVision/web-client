import { PopoverContentCardBlock } from "components/popover/popover-card.block";
import * as React from "react";

export const DialogBottom: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children
}) => (
  <PopoverContentCardBlock size={"big"} className={className}>
    {children}
  </PopoverContentCardBlock>
);
