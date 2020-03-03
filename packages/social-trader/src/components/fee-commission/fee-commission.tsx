import "./fee-commission.scss";

import classNames from "classnames";
import { MutedText } from "components/muted-text/muted-text";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { DEFAULT_DECIMAL_SCALE } from "constants/constants";
import * as React from "react";
import { formatValue } from "utils/formatter";

export const _FeeCommission: React.FC<Props> = ({
  title,
  value,
  currency,
  className
}) => (
  <Row className={classNames("fee-commission", className)}>
    <RowItem>
      <MutedText>{title}</MutedText>
    </RowItem>
    <RowItem>
      <span className="fee-commission__value">
        {formatValue(value, DEFAULT_DECIMAL_SCALE)}{" "}
      </span>
      <MutedText>{currency}</MutedText>
    </RowItem>
  </Row>
);

const FeeCommission = React.memo(_FeeCommission);
export default FeeCommission;

interface Props {
  className?: string;
  title: string;
  value: number | string;
  currency: string;
}
