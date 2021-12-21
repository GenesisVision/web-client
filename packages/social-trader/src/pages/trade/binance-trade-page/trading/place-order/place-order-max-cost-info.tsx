import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/contexts/terminal-info.context";
import React, { useContext } from "react";

import { terminalMoneyFormat } from "../components/terminal-money-format/terminal-money-format";
import {
  PlaceOrderInfoRow,
  PlaceOrderLabeledValue
} from "./components/place-order-info-row/place-order-info-row";

interface IMaxCostInfo {
  longCost: number;
  shortCost: number;
  maxLong: number;
  maxShort: number;
}

export const PlaceOrderMaxCostInfo: React.FC<IMaxCostInfo> = ({
  longCost,
  shortCost,
  maxLong,
  maxShort
}) => {
  const {
    symbol: { baseAsset, quoteAsset },
    tickSize,
    stepSize
  } = useContext(TerminalInfoContext);

  return (
    <>
      <PlaceOrderInfoRow
        left={
          <PlaceOrderLabeledValue
            value={`${terminalMoneyFormat({
              amount: longCost,
              tickSize
            })} ${quoteAsset}`}
            label={"Cost"}
          />
        }
        right={
          <PlaceOrderLabeledValue
            value={`${terminalMoneyFormat({
              amount: shortCost,
              tickSize
            })} ${quoteAsset}`}
            label={"Cost"}
          />
        }
      />
      <PlaceOrderInfoRow
        size={"small"}
        left={
          <PlaceOrderLabeledValue
            value={`${terminalMoneyFormat({
              amount: maxLong,
              tickSize: stepSize
            })} ${baseAsset}`}
            label={"Max"}
          />
        }
        right={
          <PlaceOrderLabeledValue
            value={`${terminalMoneyFormat({
              amount: maxShort,
              tickSize: stepSize
            })} ${baseAsset}`}
            label={"Max"}
          />
        }
      />
    </>
  );
};

interface IBuySellInfo {
  sliderBuy: number;
  sliderSell: number;
}

export const PlaceOrderSliderBuySellInfo: React.FC<IBuySellInfo> = ({
  sliderBuy,
  sliderSell
}) => {
  const {
    symbol: { baseAsset },
    stepSize
  } = useContext(TerminalInfoContext);

  return (
    <PlaceOrderInfoRow
      left={
        <PlaceOrderLabeledValue
          value={`${terminalMoneyFormat({
            amount: sliderBuy,
            tickSize: stepSize
          })} ${baseAsset}`}
          label={"Buy"}
        />
      }
      right={
        <PlaceOrderLabeledValue
          value={`${terminalMoneyFormat({
            amount: sliderSell,
            tickSize: stepSize
          })} ${baseAsset}`}
          label={"Sell"}
        />
      }
    />
  );
};
