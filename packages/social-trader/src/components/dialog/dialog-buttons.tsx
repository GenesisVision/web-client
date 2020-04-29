import { Row } from "components/row/row";
import * as React from "react";

export const _DialogButtons: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children
}) => (
  <Row xlarge className="dialog__buttons">
    {children}
  </Row>
);

export const DialogButtons = React.memo(_DialogButtons);
