import { DefaultBlock } from "components/default.block/default.block";
import { Row } from "components/row/row";
import { OrderBookContainer } from "pages/trades/binance-trade-page/trading/order-book/order-book.container";
import React from "react";

interface Props {}

export const OrderBookBlock: React.FC<Props> = () => {
  return (
    <DefaultBlock solid>
      <Row>
        <h2>Order book</h2>
      </Row>
      <OrderBookContainer />
    </DefaultBlock>
  );
};
