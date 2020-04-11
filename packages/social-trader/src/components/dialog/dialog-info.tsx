import { MutedText } from "components/muted-text/muted-text";
import { Row } from "components/row/row";
import * as React from "react";

export const DialogInfo: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children
}) => (
  <Row large className="dialog__info">
    <MutedText small noWrap={false}>
      {children}{" "}
    </MutedText>
  </Row>
);
