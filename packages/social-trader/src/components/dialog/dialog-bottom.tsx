import "./dialog.scss";

import { PopoverContentCardBlock } from "components/popover/popover-card.block";
import * as React from "react";

export const _DialogBottom: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children
}) => (
  <PopoverContentCardBlock size={"big"} className={className}>
    {children}
  </PopoverContentCardBlock>
);

export const DialogBottom = React.memo(_DialogBottom);
