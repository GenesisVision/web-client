import { Row } from "components/row/row";
import * as React from "react";

export const AssetRow: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children
}) => {
  return (
    <Row center={false} wrap>
      {children}
    </Row>
  );
};

export default AssetRow;
