import {
  CurrencyItem,
  ICurrencyItemProps
} from "components/currency-item/currency-item";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { Text } from "components/text/text";
import React from "react";
import styled from "styled-components";

interface Props extends ICurrencyItemProps {
  showName?: boolean;
  available?: number | string;
}

const Name = styled(RowItem)`
  min-width: 80px;
`;

const _CurrencyItemWithAmount: React.FC<Props> = ({
  showName,
  available,
  symbol,
  name,
  ...props
}) => {
  return (
    <Row>
      <Name>
        <CurrencyItem
          {...props}
          symbol={symbol}
          name={available !== undefined && !showName ? symbol : name}
        />
      </Name>
      <RowItem>
        <Text muted>{available}</Text>
      </RowItem>
    </Row>
  );
};

export const CurrencyItemWithAmount = React.memo(_CurrencyItemWithAmount);
