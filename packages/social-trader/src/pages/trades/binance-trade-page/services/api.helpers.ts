import { BrokerTradeServerType } from "gv-api-web";
import { getBinanceTerminalApiMethods } from "pages/trades/binance-trade-page/binance-trade.helpers";
import { TerminalType } from "pages/trades/binance-trade-page/trading/trading.types";

export const getTerminalApiMethods = (
  brokerType?: BrokerTradeServerType,
  type?: TerminalType
) => {
  switch (brokerType) {
    case "Binance":
    default:
      return getBinanceTerminalApiMethods(type);
  }
};
