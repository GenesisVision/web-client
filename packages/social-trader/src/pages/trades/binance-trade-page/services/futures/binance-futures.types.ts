import {
  FuturesPosition,
  MarginModeType,
  OrderSide,
  OrderType,
  PositionSideType,
  TimeInForce,
  Trade,
  TradeCurrency
} from "pages/trades/binance-trade-page/trading/trading.types";

export type FuturesAccountEventType =
  | "ACCOUNT_UPDATE"
  | "MARGIN_CALL"
  | "ORDER_TRADE_UPDATE";

export type MarginType = MarginModeType;

export interface FuturesTickerSymbol {
  symbol: TradeCurrency;
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
  asset: TradeCurrency;
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
  symbol: TradeCurrency; // Symbol
  positionSide: PositionSideType; // Position Side
  positionAmount: string; // Position Amount
  marginType: MarginType; // Margin Type
  isolatedWallet: string; // Isolated Wallet (if isolated position)
  markPrice: string; // Mark Price
  unrealizedPnL: string; // Unrealized PnL
  maintenanceMarginRequired: string; // Maintenance Margin Required
}

export interface FuturesAccountEventPosition {
  symbol: string; // Symbol
  positionAmt: string; // Position Amount
  entryPrice: string; // Entry Price
  accumulatedRealized: string; // (Pre-fee) Accumulated Realized
  unrealizedProfit: string; // Unrealized PnL
  marginType: MarginType; // Margin Type
  isolatedWallet: string; // Isolated Wallet (if isolated position)
  positionSide: PositionSideType; // Position Side
}

export interface FuturesAccountEventBalance {
  asset: TradeCurrency; // Asset
  walletBalance: string; // Wallet Balance
  crossWalletBalance: string; // Cross Wallet Balance
}

export interface FuturesTradeOrder {
  symbol: TradeCurrency; // Symbol
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
  commissionAsset: Trade; // Commission Asset, will not push if no commission
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
  eventType: FuturesAccountEventType; // Event Type
  eventTime: number; // Event Time
  crossWalletBalance: string; // Cross Wallet Balance. Only pushed with crossed position margin call
  positions: FuturesMarginCallEventPosition[];
}

export interface FuturesAccountUpdateEvent {
  eventType: FuturesAccountEventType; // Event Type
  eventTime: number; // Event Time               // Event Time
  transactionTime: number; // Transaction
  accountUpdate: // Update Data
  {
    balances: FuturesAccountEventBalance[];
    positions: FuturesAccountEventPosition[];
  };
}

export interface FuturesTradeOrderUpdateEvent {
  eventType: FuturesAccountEventType; // Event Type
  eventTime: number; // Event Time               // Event Time
  transactionTime: number; // Tran        //  Transaction Time
  order: FuturesTradeOrder;
}
