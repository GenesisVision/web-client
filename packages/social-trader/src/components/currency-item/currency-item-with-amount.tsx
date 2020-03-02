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
  ...props
}) => {
  return (
    <Row>
      <RowItem>
        <CurrencyItem {...props} symbol={symbol} name={symbol} />
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
