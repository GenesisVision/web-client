import { Center } from "components/center/center";
import { RowItem } from "components/row-item/row-item";
import { TradeStatefulValue } from "pages/trades/binance-trade-page/trading/components/trade-stateful-value/trade-stateful-value";
import { TradeCurrency } from "pages/trades/binance-trade-page/trading/trading.types";
import React from "react";

import styles from "./order-book.module.scss";

interface Props {
  tradeId?: number;
  price: string;
  currency: TradeCurrency;
  equivalent: string;
  equivalentCurrency: TradeCurrency;
}

const _OrderBookCurrentPrice: React.FC<Props> = ({
  tradeId,
  price,
  currency,
  equivalent,
  equivalentCurrency
}) => {
  return (
    <Center className={styles["order-book__current-price"]}>
      <RowItem large>
        <TradeStatefulValue value={price} trigger={tradeId} />
      </RowItem>
      <RowItem>
        {equivalent} {equivalentCurrency}
      </RowItem>
    </Center>
  );
};

export const OrderBookCurrentPrice = React.memo(_OrderBookCurrentPrice);
