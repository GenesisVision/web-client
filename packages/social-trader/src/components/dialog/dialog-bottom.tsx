import { PopoverContentCardBlock } from "components/popover/popover-card.block";
import * as React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  fixed?: boolean;
}

export const DialogBottom: React.FC<Props> = ({
  fixed = true,
  className,
  children
}) => (
  <PopoverContentCardBlock size={"big"} fixed={fixed} className={className}>
    {children}
  </PopoverContentCardBlock>
);
