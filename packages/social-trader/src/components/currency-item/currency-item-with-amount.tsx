import "./currency-item.scss";

import {
  CurrencyItem,
  ICurrencyItemProps
} from "components/currency-item/currency-item";
import { MutedText } from "components/muted-text/muted-text";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import React from "react";

const _CurrencyItemWithAmount: React.FC<Props> = ({
  available,
  symbol,
  name,
  ...props
}) => {
  return (
    <Row>
      <RowItem className="currency-item-with-amount__name">
        <CurrencyItem
          {...props}
          symbol={symbol}
          name={available ? symbol : name}
        />
      </RowItem>
      <RowItem>
        <MutedText>{available}</MutedText>
      </RowItem>
    </Row>
  );
};

interface Props extends ICurrencyItemProps {
  available?: number;
}

export const CurrencyItemWithAmount = React.memo(_CurrencyItemWithAmount);
