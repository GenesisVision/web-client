import { PopoverContentCardBlock } from "components/popover/popover-card.block";
import { Row } from "components/row/row";
import * as React from "react";

export const DialogTop: React.FC<React.HTMLAttributes<HTMLDivElement> &
  Props> = ({ title, subtitle, children }) => (
  <PopoverContentCardBlock dark size={"big"} fixed>
    <div className="dialog__header">
      {title && (
        <Row>
          <h2>{title}</h2>
        </Row>
      )}
      {subtitle && (
        <Row small className="dialog__subtitle">
          {subtitle}
        </Row>
      )}
    </div>
    {children}
  </PopoverContentCardBlock>
);

interface Props {
  title?: string | JSX.Element;
  subtitle?: string | JSX.Element;
}
