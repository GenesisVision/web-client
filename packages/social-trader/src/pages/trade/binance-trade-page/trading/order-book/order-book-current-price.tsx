import { Center } from "components/center/center";
import { RowItem } from "components/row-item/row-item";
import { Text } from "components/text/text";
import { terminalMoneyFormat } from "pages/trade/binance-trade-page/trading/components/terminal-money-format/terminal-money-format";
import { TradeStatefulValue } from "pages/trade/binance-trade-page/trading/components/trade-stateful-value/trade-stateful-value";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import { TerminalCurrency } from "pages/trade/binance-trade-page/trading/terminal.types";
import React, { useContext } from "react";
import NumberFormat from "react-number-format";

import styles from "./order-book.module.scss";

interface Props {
  price: number;
  markPrice?: number;
  equivalentCurrency?: TerminalCurrency;
  equivalent?: string;
  tradeId?: number;
}

const _OrderBookCurrentPrice: React.FC<Props> = ({
  tradeId,
  price,
  markPrice,
  equivalent,
  equivalentCurrency
}) => {
  const { tickSize } = useContext(TerminalInfoContext);
  return (
    <Center className={styles["order-book__current-price"]}>
      <RowItem
        size={"large"}
        className={styles["order-book__current-original-price"]}
      >
        <TradeStatefulValue
          thousandSeparator={","}
          showArrow
          value={terminalMoneyFormat({ amount: price, tickSize })}
          trigger={tradeId}
        />
      </RowItem>
      {equivalent && (
        <RowItem>
          <Text wrap={false}>
            <NumberFormat
              displayType="text"
              thousandSeparator={","}
              value={equivalent}
              suffix={` ${equivalentCurrency}`}
            />
          </Text>
        </RowItem>
      )}
      {markPrice && (
        <RowItem>
          <Text wrap={false}>
            {terminalMoneyFormat({ amount: markPrice, tickSize })}
          </Text>
        </RowItem>
      )}
    </Center>
  );
};

export const OrderBookCurrentPrice = React.memo(_OrderBookCurrentPrice);
