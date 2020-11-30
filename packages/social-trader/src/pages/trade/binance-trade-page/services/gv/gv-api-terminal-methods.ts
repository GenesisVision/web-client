import { getFavorites } from "pages/trade/binance-trade-page/services/gv/gv-terminal-http.service";
import { IGVTerminalMethods } from "pages/trade/binance-trade-page/trading/terminal.types";

export const GVTerminalMethods: IGVTerminalMethods = {
  getFavorites
};
