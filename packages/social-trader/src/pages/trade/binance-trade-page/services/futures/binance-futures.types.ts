import { BinanceFuturesMarginType, BinancePositionSide } from "gv-api-web";
import {
  FuturesOrder,
  FuturesPosition,
  MarginModeType,
  OrderSide,
  OrderType,
  TerminalCurrency,
  TimeInForce
} from "pages/trade/binance-trade-page/trading/terminal.types";

export enum FUTURES_ACCOUNT_EVENT {
  accountUpdate = "ACCOUNT_UPDATE",
  marginCall = "MARGIN_CALL",
  orderTradeUpdate = "ORDER_TRADE_UPDATE",
  accountConfigUpdate = "ACCOUNT_CONFIG_UPDATE"
}

export type MarginType = MarginModeType;

export interface FuturesTickerSymbol {
  symbol: TerminalCurrency;
  priceChange: string;
  priceChangePercent: string;
  weightedAvgPrice: string;
  prevClosePrice: string;
  lastPrice: string;
  lastQty: string;
  openPrice: string;
  highPrice: string;
  lowPrice: string;
  volume: string;
  quoteVolume: string;
  openTime: number;
  closeTime: number;
  firstId: number; // First tradeId
  lastId: number; // Last tradeId
  count: number; // Trade count
}

export interface FuturesAsset {
  asset: TerminalCurrency;
  initialMargin: string;
  maintMargin: string;
  marginBalance: string;
  maxWithdrawAmount: string;
  openOrderInitialMargin: string;
  positionInitialMargin: string;
  unrealizedProfit: string;
  walletBalance: string;
}

export interface FuturesAccount {
  assets: FuturesAsset[];
  canDeposit: boolean;
  canTrade: boolean;
  canWithdraw: boolean;
  feeTier: number;
  maxWithdrawAmount: "8.41264592";
  positions: FuturesPosition[];
  totalInitialMargin: string;
  totalMaintMargin: string;
  totalMarginBalance: string;
  totalOpenOrderInitialMargin: string;
  totalPositionInitialMargin: string;
  totalUnrealizedProfit: number;
  totalWalletBalance: string;
  updateTime: 0;
}

export interface FuturesMarginCallEventPosition {
  symbol: TerminalCurrency; // Symbol
  positionSide: BinancePositionSide; // Position Side
  quantity: number; // Position Amount
  marginType: MarginType; // Margin Type
  isolatedWallet: string; // Isolated Wallet (if isolated position)
  markPrice: string; // Mark Price
  unrealizedPnL: string; // Unrealized PnL
  maintenanceMarginRequired: string; // Maintenance Margin Required
}

export interface FuturesAccountEventPosition {
  symbol: string; // Symbol
  quantity: number; // Position Amount
  entryPrice: number; // Entry Price
  // accumulatedRealized: string; // (Pre-fee) Accumulated Realized
  unrealizedPnL: number; // Unrealized PnL
  marginType: BinanceFuturesMarginType; // Margin Type
  isolatedMargin: number; // Isolated Wallet (if isolated position)
  positionSide: BinancePositionSide; // Position Side
}

export interface FuturesAccountEventBalance {
  asset: TerminalCurrency; // Asset
  // balanceChange: Balance Change except PnL and Commission
  walletBalance: number; // Wallet Balance
  crossWalletBalance: number; // Cross Wallet Balance
}

export interface FuturesTradeOrder {
  symbol: TerminalCurrency; // Symbol
  clientOrderId: string; // Client Order Id
  // special client order id:
  // starts with "autoclose-": liquidation order
  // "adl_autoclose": ADL auto close order
  side: OrderSide; // Side
  orderType: OrderType; // Order Type
  timeInForce: TimeInForce; // Time in Force
  originalQuantity: string; // Original Quantity
  originalPrice: string; // Original Price
  averagePrice: string; // Average Price
  stopPrice: string; // Stop Price
  executionType: string; // Execution Type
  orderStatus: string; // Order Status
  orderId: number; // Order Id
  orderLastFilledQuantity: string; // Order Last Filled Quantity
  orderFilledAccumulatedQuantity: string; // Order Filled Accumulated Quantity
  lastFilledPrice: string; // Last Filled Price
  commissionAsset: any; // Commission Asset, will not push if no commission
  commission: string; // Commission, will not push if no commission
  orderTradeTime: number; // Order Trade Time
  tradeId: number; // Trade Id
  bidsNotional: string; // Bids Notional
  askNotional: string; // Ask Notional
  isMakerSide: boolean; // Is this trade the maker side?
  isReduceOnly: boolean; // Is this reduce only
  stopPriceWorkingType: string; // stop price working type
  ifCloseAll: boolean; // If Close-All, only pushed with conditional order
  activationPrice: string; // Activation Price, only puhed with TRAILING_STOP_MARKET order
  callbackRate: string; // Callback Rate, only puhed with TRAILING_STOP_MARKET order
}

export interface FuturesMarginCallEvent {
  eventType: FUTURES_ACCOUNT_EVENT.marginCall; // Event Type
  eventTime: number; // Event Time
  crossWalletBalance?: string; // Cross Wallet Balance. Only pushed with crossed position margin call
  positions: FuturesMarginCallEventPosition[];
}

export interface FuturesAccountUpdateEvent {
  eventType: FUTURES_ACCOUNT_EVENT; // Event Type
  eventTime: number; // Event Time               // Event Time
  transactionTime: number; // Transaction
  balances: FuturesAccountEventBalance[];
  positions: FuturesAccountEventPosition[];
}

export interface FuturesTradeOrderUpdateEvent {
  eventType: FUTURES_ACCOUNT_EVENT; // Event Type
  eventTime: number; // Event Time               // Event Time
  transactionTime: number; // Tran        //  Transaction Time
  order: FuturesOrder;
}
