import { BrokerTradeServerType } from "gv-api-web";
import { GVFuturesTerminalMethods } from "pages/trade/binance-trade-page/services/gv/futures/gv-futures-api-terminal-methods";
import { GVSpotTerminalMethods } from "pages/trade/binance-trade-page/services/gv/spot/gv-spot-api-terminal-methods";
import {
  ITerminalMethods,
  TerminalType
} from "pages/trade/binance-trade-page/trading/terminal.types";

export const TYPE_PARAM_NAME = "type";

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

export const getBinanceTerminalApiMethods = (
  type?: TerminalType
): ITerminalMethods => {
  switch (type) {
    case "futures":
      return GVFuturesTerminalMethods;
    case "spot":
    default:
      return GVSpotTerminalMethods;
  }
};
