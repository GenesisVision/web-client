import { getFavorites } from "pages/trades/binance-trade-page/services/gv/gv-terminal-http.service";
import { IGVTerminalMethods } from "pages/trades/binance-trade-page/trading/terminal.types";

export const GVTerminalMethods: IGVTerminalMethods = {
  getFavorites
};
