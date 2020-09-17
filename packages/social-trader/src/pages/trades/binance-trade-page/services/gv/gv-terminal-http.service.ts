import { TradingPlatformBinanceOrdersMode } from "gv-api-web";
import { ExecutionReport } from "pages/trades/binance-trade-page/trading/terminal.types";
import { from, Observable } from "rxjs";
import { api } from "services/api-client/swagger-custom-client";

export const getFavorites = async (id?: string) =>
  id
    ? await api
        .terminal()
        .getTradingPlatformFavoriteSymbols(id)
        .then(({ items }) => items)
    : [];

export const getOrders = (
  accountId: string,
  options: {
    accountId?: string;
    mode?: TradingPlatformBinanceOrdersMode;
    skip?: number;
    take?: number;
  }
) => {
  return api
    .terminal()
    .getTradingPlatformBinanceOrders({
      ...options,
      accountId
    })
    .then(({ items }) => (items as unknown) as ExecutionReport[]);
};

export const getGVOpenOrders = (id: string): Observable<ExecutionReport[]> =>
  from(getOrders(id, { mode: "OpenOrders" }));

export const getGVHistory = (id: string): Observable<ExecutionReport[]> =>
  from(getOrders(id, { mode: "History" }));
