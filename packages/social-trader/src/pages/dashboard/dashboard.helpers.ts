import { BrokerTradeServerType } from "gv-api-web";
import { META_TRADER_4_ROUTE, META_TRADER_5_ROUTE } from "routes/trade.routes";

export const getTerminalLink = (brokerType: BrokerTradeServerType): string => {
  switch (brokerType) {
    case "BinanceFollow":
      return "https://www.binance.com/en/login";
    case "Huobi":
      return "https://www.hbg.com/en-us/login/";
    case "Exante":
      return "https://exante.eu/ru/clientsarea/accounts/login";
    case "MetaTrader5":
      return META_TRADER_5_ROUTE;
    case "MetaTrader4":
    default:
      return META_TRADER_4_ROUTE;
  }
};
