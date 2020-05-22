export const TRADE = "trade";
export const TRADE_ROUTE = `/${TRADE}`;

export const TERMINAL = "terminal";
export const TERMINAL_ROUTE = `${TRADE_ROUTE}/${TERMINAL}`;
export const TERMINAL_FOLDER_ROUTE = `${TRADE_ROUTE}/${TERMINAL}/[id]`;
export const BINANCE = "binance";
export const BINANCE_ROUTE = `${TRADE_ROUTE}/${BINANCE}`;
export const BINANCE_FOLDER_ROUTE = `${TRADE_ROUTE}/${BINANCE}/[id]`;
export const META_TRADER_4 = "mt4";
export const META_TRADER_4_ROUTE = `${TRADE_ROUTE}/${META_TRADER_4}`;
export const META_TRADER_5 = "mt5";
export const META_TRADER_5_ROUTE = `${TRADE_ROUTE}/${META_TRADER_5}`;
export const COMING_SOON = "coming-soon";
export const COMING_SOON_ROUTE = `${TRADE_ROUTE}/${COMING_SOON}`;
