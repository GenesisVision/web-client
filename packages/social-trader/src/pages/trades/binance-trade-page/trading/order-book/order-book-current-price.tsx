import { Center } from "components/center/center";
import { RowItem } from "components/row-item/row-item";
import { terminalMoneyFormat } from "pages/trades/binance-trade-page/trading/components/terminal-money-format/terminal-money-format";
import { TradeStatefulValue } from "pages/trades/binance-trade-page/trading/components/trade-stateful-value/trade-stateful-value";
import { TerminalInfoContext } from "pages/trades/binance-trade-page/trading/terminal-info.context";
import { TradeCurrency } from "pages/trades/binance-trade-page/trading/terminal.types";
import React, { useContext } from "react";

import styles from "./order-book.module.scss";

interface Props {
  tradeId?: number;
  price: string;
  equivalent?: string;
  equivalentCurrency: TradeCurrency;
}

const _OrderBookCurrentPrice: React.FC<Props> = ({
  tradeId,
  price,
  equivalent,
  equivalentCurrency
}) => {
  const { tickSize } = useContext(TerminalInfoContext);
  return (
    <Center className={styles["order-book__current-price"]}>
      <RowItem large>
        <TradeStatefulValue
          value={terminalMoneyFormat({ amount: price, tickSize })}
          trigger={tradeId}
        />
      </RowItem>
      {equivalent && (
        <RowItem>
          {equivalent} {equivalentCurrency}
        </RowItem>
      )}
    </Center>
  );
};

export const OrderBookCurrentPrice = React.memo(_OrderBookCurrentPrice);
