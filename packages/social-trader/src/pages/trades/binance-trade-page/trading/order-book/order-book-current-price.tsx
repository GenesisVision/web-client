import { Center } from "components/center/center";
import { ColoredText } from "components/colored-text/colored-text";
import { RowItem } from "components/row-item/row-item";
import { getTextColor } from "pages/trades/binance-trade-page/trading/trading.helpers";
import { TradeCurrency } from "pages/trades/binance-trade-page/trading/trading.types";
import React, { useEffect, useState } from "react";

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
  const [prevLastPrice, setPrevLastPrice] = useState(price);
  const [currentLastPrice, setCurrentLastPrice] = useState(price);
  useEffect(() => {
    setPrevLastPrice(currentLastPrice);
    setCurrentLastPrice(price);
  }, [tradeId]);

  return (
    <Center className={styles["order-book__current-price"]}>
      <RowItem large>
        <ColoredText color={getTextColor(+price - +prevLastPrice)}>
          {price}
        </ColoredText>
      </RowItem>
      <RowItem>
        {equivalent} {equivalentCurrency}
      </RowItem>
    </Center>
  );
};

export const OrderBookCurrentPrice = React.memo(_OrderBookCurrentPrice);
