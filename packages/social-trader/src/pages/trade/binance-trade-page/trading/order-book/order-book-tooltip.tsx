import clsx from "clsx";
import { DialogListItem } from "components/dialog/dialog-list-item";
import { terminalMoneyFormat } from "pages/trade/binance-trade-page/trading/components/terminal-money-format/terminal-money-format";
import React, { useMemo } from "react";

import { TerminalCurrency } from "../terminal.types";
import { ORDER_BOOK_ROW_HEIGHT } from "./order-book.helpers";
import styles from "./order-book.module.scss";

export interface LevelsSum {
  avgPrice: number;
  baseSum: number;
  quoteSum: number;
}

interface Props {
  stepSize: string;
  tickSize: string;
  baseAsset: TerminalCurrency;
  quoteAsset: TerminalCurrency;
  hoveredRow?: number;
  tableTickSize?: string;
  levelSum?: LevelsSum;
}

const _OrderBookTooltip: React.FC<Props> = ({
  stepSize,
  quoteAsset,
  baseAsset,
  tickSize,
  hoveredRow,
  tableTickSize,
  levelSum: { avgPrice, baseSum, quoteSum } = {
    avgPrice: 0,
    baseSum: 0,
    quoteSum: 0
  }
}) => {
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

  const offset = useMemo(
    () => ORDER_BOOK_ROW_HEIGHT * (hoveredRow || 0) + ORDER_BOOK_ROW_HEIGHT / 2,
    [hoveredRow]
  );

  return (
    <div
      className={clsx(styles["order-book__tooltip"])}
      style={{ transform: `translateY(calc(-50% + ${offset}px))` }}
    >
      <DialogListItem size={"small"} label={"Avg.Price"}>
        {formattedAvgPrice}
      </DialogListItem>
      <DialogListItem size={"small"} label={`sum ${baseAsset}`}>
        {formattedBaseSum}
      </DialogListItem>
      <DialogListItem size={"small"} label={`sum ${quoteAsset}`}>
        {formattedQuoteSum}
      </DialogListItem>
    </div>
  );
};

export const OrderBookTooltip = React.memo(_OrderBookTooltip);
