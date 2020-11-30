import clsx from "clsx";
import { Center } from "components/center/center";
import { ColoredTextColor } from "components/colored-text/colored-text";
import { DialogListItem } from "components/dialog/dialog-list-item";
import { HORIZONTAL_POPOVER_POS } from "components/popover/popover";
import { Text } from "components/text/text";
import Tooltip from "components/tooltip/tooltip";
import { TooltipContent } from "components/tooltip/tooltip-content";
import { terminalMoneyFormat } from "pages/trade/binance-trade-page/trading/components/terminal-money-format/terminal-money-format";
import { ORDER_BOOK_ROW_HEIGHT } from "pages/trade/binance-trade-page/trading/order-book/order-book.helpers";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/terminal-info.context";
import { TradingPriceContext } from "pages/trade/binance-trade-page/trading/trading-price.context";
import React, { useContext } from "react";

import styles from "./order-book.module.scss";

export interface LevelsSum {
  avgPrice: number;
  baseSum: number;
  quoteSum: number;
}

interface Props {
  hasOrder?: boolean;
  barPercent: number;
  tableTickSize?: string;
  hovered: boolean;
  levelSum?: LevelsSum;
  index: number;
  setHoveredRow: (index: number | undefined) => void;
  color: ColoredTextColor;
  price: string;
  amount: string;
  total: number;
}

const _OrderBookRow: React.FC<Props> = ({
  hasOrder,
  barPercent,
  tableTickSize,
  hovered,
  levelSum: { avgPrice, baseSum, quoteSum } = {
    avgPrice: 0,
    baseSum: 0,
    quoteSum: 0
  },
  index,
  setHoveredRow,
  color,
  price,
  amount,
  total
}) => {
  const { setPrice } = useContext(TradingPriceContext);
  const {
    stepSize,
    tickSize,
    symbol: { baseAsset, quoteAsset }
  } = useContext(TerminalInfoContext);
  const formattedPrice = terminalMoneyFormat({
    amount: price,
    tickSize: tableTickSize || tickSize
  });
  const formattedAmount = terminalMoneyFormat({
    amount: amount,
    tickSize: stepSize
  });
  const formattedTotal = terminalMoneyFormat({
    amount: total,
    tickSize: tableTickSize || tickSize
  });
  const formattedAvgPrice = terminalMoneyFormat({
    amount: avgPrice,
    tickSize: tableTickSize || tickSize
  });
  const formattedBaseSum = terminalMoneyFormat({
    amount: baseSum,
    tickSize: stepSize
  });
  const formattedQuoteSum = terminalMoneyFormat({
    amount: quoteSum,
    tickSize: tableTickSize || tickSize
  });
  return (
    <Tooltip
      onMouseEnter={() => setHoveredRow(index)}
      onMouseLeave={() => setHoveredRow(undefined)}
      onClick={() => setPrice(String(price))}
      horizontal={HORIZONTAL_POPOVER_POS.RIGHT}
      render={() => (
        <TooltipContent fixed={false}>
          <DialogListItem label={"Avg.Price"}>
            {formattedAvgPrice}
          </DialogListItem>
          <DialogListItem label={`sum ${baseAsset}`}>
            {formattedBaseSum}
          </DialogListItem>
          <DialogListItem label={`sum ${quoteAsset}`}>
            {formattedQuoteSum}
          </DialogListItem>
        </TooltipContent>
      )}
    >
      <tr
        style={{
          height: `${ORDER_BOOK_ROW_HEIGHT}px`,
          background: `linear-gradient(90deg, transparent ${barPercent}%, ${color}30 ${barPercent}%)`
        }}
        className={clsx(styles["order-book__table-row"], {
          [styles["order-book__table-row--hovered"]]: hovered
        })}
      >
        <td className={clsx(styles["order-book__first-cell"])}>
          <Center>
            {hasOrder && (
              <div className={styles["order-book__has-order-bubble"]} />
            )}
            <Text size={"xsmall"} color={color}>
              {formattedPrice}
            </Text>
          </Center>
        </td>
        <td>{formattedAmount}</td>
        <td>{formattedTotal}</td>
      </tr>
    </Tooltip>
  );
};

export const OrderBookRow = React.memo(_OrderBookRow);
