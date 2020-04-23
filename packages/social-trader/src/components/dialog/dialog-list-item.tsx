import { MutedText } from "components/muted-text/muted-text";
import { Row } from "components/row/row";
import * as React from "react";

export const _DialogListItem: React.FC<React.HTMLAttributes<HTMLDivElement> &
  Props> = ({ label, children }) => (
  <Row className="dialog-list__item">
    <MutedText>{label}</MutedText>
    <span>{children}</span>
  </Row>
);

interface Props {
  label: string;
}

export const DialogListItem = React.memo(_DialogListItem);
