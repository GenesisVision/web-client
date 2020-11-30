import { BrokerTradeServerType } from "gv-api-web";
import { getBinanceTerminalApiMethods } from "pages/trade/binance-trade-page/binance-trade.helpers";
import { TerminalType } from "pages/trade/binance-trade-page/trading/terminal.types";

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
