import { PopoverContentCardBlock } from "components/popover/popover-card.block";
import * as React from "react";

export const DialogTop: React.FC<React.HTMLAttributes<HTMLDivElement> &
  Props> = ({ title, subtitle, children }) => (
  <PopoverContentCardBlock dark size={"big"}>
    <div className="dialog__header">
      {title && <h2>{title}</h2>}
      {subtitle && <div className="dialog__subtitle">{subtitle}</div>}
    </div>
    {children}
  </PopoverContentCardBlock>
);

interface Props {
  title?: string | JSX.Element;
  subtitle?: string | JSX.Element;
}
