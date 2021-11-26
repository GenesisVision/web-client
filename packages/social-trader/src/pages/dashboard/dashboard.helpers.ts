import { BrokerTradeServerType, DashboardProfits } from "gv-api-web";
import {
  META_TRADER_4_ROUTE,
  META_TRADER_5_ROUTE,
  TERMINAL_ROUTE
} from "routes/trade.routes";

export const getTerminalLink = (
  brokerType: BrokerTradeServerType,
  id?: string
): string => {
  switch (brokerType) {
    case "Binance":
      return `${TERMINAL_ROUTE}?id=${id}&type=spot`;
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

export const hasProfits = (profits: DashboardProfits) =>
  Object.values(profits)
    .map(({ profit }) => profit)
    .reduce((prev, cur) => prev + cur, 0) !== 0;
