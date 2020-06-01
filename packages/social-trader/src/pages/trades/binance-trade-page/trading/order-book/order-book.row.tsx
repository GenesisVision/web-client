import classNames from "classnames";
import { ColoredTextColor } from "components/colored-text/colored-text";
import { DialogListItem } from "components/dialog/dialog-list-item";
import { HORIZONTAL_POPOVER_POS } from "components/popover/popover";
import { Text } from "components/text/text";
import Tooltip from "components/tooltip/tooltip";
import { TooltipContent } from "components/tooltip/tooltip-content";
import { terminalMoneyFormat } from "pages/trades/binance-trade-page/trading/components/terminal-money-format/terminal-money-format";
import { TradingInfoContext } from "pages/trades/binance-trade-page/trading/trading-info.context";
import { TradingPriceContext } from "pages/trades/binance-trade-page/trading/trading-price.context";
import React, { useContext } from "react";

import styles from "./order-book.module.scss";

export interface LevelsSum {
  avgPrice: number;
  baseSum: number;
  quoteSum: number;
}

interface Props {
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
  } = useContext(TradingInfoContext);
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
    tickSize: stepSize
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
      onClick={() => setPrice(price)}
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
        className={classNames(styles["order-book__table-row"], {
          [styles["order-book__table-row--hovered"]]: hovered
        })}
      >
        <td>
          <Text color={color}>{formattedPrice}</Text>
        </td>
        <td>{formattedAmount}</td>
        <td>{formattedTotal}</td>
      </tr>
    </Tooltip>
  );
};

export const OrderBookRow = React.memo(_OrderBookRow);
