import { OrderType } from "pages/trade/binance-trade-page/trading/terminal.types";

export enum CLOSE_POSITION_FIELDS {
  price = "price",
  amount = "amount"
}

export interface IClosePositionFormValues {
  [CLOSE_POSITION_FIELDS.price]: number;
  [CLOSE_POSITION_FIELDS.amount]: number;
}

export interface ClosePositionSubmitValues extends IClosePositionFormValues {
  type: OrderType;
}
