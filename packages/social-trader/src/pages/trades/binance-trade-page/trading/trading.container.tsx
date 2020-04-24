import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { TradeAuthDataType } from "pages/trades/binance-trade-page/binance-trade.helpers";
import { MarketWatchBlock } from "pages/trades/binance-trade-page/trading/market-watch/market-watch.block";
import { OpenOrdersBlock } from "pages/trades/binance-trade-page/trading/open-orders/open-orders.block";
import { Trade } from "pages/trades/binance-trade-page/trading/trade/trade";
import { TradingInfoContextProvider } from "pages/trades/binance-trade-page/trading/trading-info.context";
import React from "react";

interface Props {
  authData: TradeAuthDataType;
}

const _TradingContainer: React.FC<Props> = ({ authData }) => {
  return (
    <TradingInfoContextProvider>
      <Row>
        <RowItem>
          <MarketWatchBlock />
        </RowItem>
        <RowItem>
          <Trade />
        </RowItem>
      </Row>
      <Row onlyOffset>
        <OpenOrdersBlock />
      </Row>
    </TradingInfoContextProvider>
  );
};

export const TradingContainer = React.memo(_TradingContainer);
