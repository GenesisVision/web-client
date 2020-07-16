import {
  CurrencyItem,
  ICurrencyItemProps
} from "components/currency-item/currency-item";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { Text } from "components/text/text";
import React from "react";

import styles from "./currency-item-with-amount.module.scss";

const _CurrencyItemWithAmount: React.FC<Props> = ({
  available,
  symbol,
  name,
  ...props
}) => {
  return (
    <Row>
      <RowItem className={styles["currency-item-with-amount__name"]}>
        <CurrencyItem
          {...props}
          symbol={symbol}
          name={available !== undefined ? symbol : name}
        />
      </RowItem>
      <RowItem>
        <Text muted>{available}</Text>
      </RowItem>
    </Row>
  );
};

interface Props extends ICurrencyItemProps {
  available?: number;
}

export const CurrencyItemWithAmount = React.memo(_CurrencyItemWithAmount);
