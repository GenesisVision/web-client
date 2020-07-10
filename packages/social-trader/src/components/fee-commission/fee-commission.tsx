import clsx from "clsx";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { Text } from "components/text/text";
import { DEFAULT_DECIMAL_SCALE } from "constants/constants";
import * as React from "react";
import { formatValue } from "utils/formatter";

import styles from "./fee-commission.module.scss";

export const _FeeCommission: React.FC<Props> = ({
  title,
  value,
  currency,
  className
}) => (
  <Row className={clsx(styles["fee-commission"], className)}>
    <RowItem>
      <Text muted>{title}</Text>
    </RowItem>
    <RowItem>
      <span className={styles["fee-commission__value"]}>
        {formatValue(value, DEFAULT_DECIMAL_SCALE)}{" "}
      </span>
      <Text muted>{currency}</Text>
    </RowItem>
  </Row>
);

const FeeCommission = React.memo(_FeeCommission);
export default FeeCommission;

interface Props {
  className?: string;
  title: string | React.ReactNode;
  value: number | string;
  currency: string;
}
