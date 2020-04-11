import { Row } from "components/row/row";
import * as React from "react";

export const DialogList: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children
}) => <Row onlyOffset>{children}</Row>;
