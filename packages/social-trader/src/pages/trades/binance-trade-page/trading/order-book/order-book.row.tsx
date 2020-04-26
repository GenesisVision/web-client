import classNames from "classnames";
import {
  ColoredText,
  ColoredTextColor
} from "components/colored-text/colored-text";
import { DialogListItem } from "components/dialog/dialog-list-item";
import { HORIZONTAL_POPOVER_POS } from "components/popover/popover";
import Tooltip from "components/tooltip/tooltip";
import { TooltipContent } from "components/tooltip/tooltip-content";
import { TradingInfoContext } from "pages/trades/binance-trade-page/trading/trading-info.context";
import { TradingPriceContext } from "pages/trades/binance-trade-page/trading/trading-price.context";
import React, { useContext } from "react";
import { formatValue } from "utils/formatter";

import styles from "./order-book.module.scss";

export interface LevelsSum {
  avgPrice: number;
  baseSum: number;
  quoteSum: number;
}

interface Props {
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
    symbol: { baseAsset, quoteAsset }
  } = useContext(TradingInfoContext);
  return (
    <Tooltip
      onMouseEnter={() => setHoveredRow(index)}
      onMouseLeave={() => setHoveredRow(undefined)}
      onClick={() => setPrice(price)}
      horizontal={HORIZONTAL_POPOVER_POS.RIGHT}
      render={() => (
        <TooltipContent fixed={false}>
          <DialogListItem label={"Avg.Price"}>{avgPrice}</DialogListItem>
          <DialogListItem label={`sum ${baseAsset}`}>{baseSum}</DialogListItem>
          <DialogListItem label={`sum ${quoteAsset}`}>
            {quoteSum}
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
          <ColoredText color={color}>{formatValue(price)}</ColoredText>
        </td>
        <td>{amount}</td>
        <td>{total}</td>
      </tr>
    </Tooltip>
  );
};

export const OrderBookRow = React.memo(_OrderBookRow);
