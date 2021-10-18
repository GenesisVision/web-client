import { SortingColumn } from "components/table/components/filtering/filter.type";
import { BinanceWorkingType } from "gv-api-web";

export const POSITIONS_TABLE_COLUMNS: SortingColumn[] = [
  {
    name: "symbol"
  },
  {
    name: "size",
    tooltip: true
  },
  {
    name: "entry-price",
    tooltip: true
  },
  {
    name: "mark-price",
    tooltip: true
  },
  {
    name: "liq-price",
    tooltip: true
  },
  {
    name: "margin-ratio",
    tooltip: true
  },
  {
    name: "margin",
    tooltip: true
  },
  {
    name: "pnl",
    tooltip: true
  },
  {
    name: "tp-sl",
    tooltip: true
  },
  {
    name: "notional-size"
  },
  // {
  //   name: "adl",
  //   tooltip: true
  // },
  {
    name: "action"
  }
];

interface ICalculatePnlInputData {
  quantity: number;
  entryPrice: number;
  workingType: BinanceWorkingType;
  lastPrice?: number;
  markPrice?: number;
}

export const calculateUnrealizedPNL = ({
  quantity,
  entryPrice,
  workingType,
  markPrice,
  lastPrice
}: ICalculatePnlInputData) => {
  const selectedPrice = workingType === "Contract" ? lastPrice : markPrice;
  const direction = quantity < 0 ? -1 : 1;
  return Math.abs(quantity) * direction * (selectedPrice! - entryPrice);
};

// ROE% =Unrealized PNL in USDT / entry margin =
// ( ( mark Price - entry Price ) * direction of order * size ) / （position_amount * contract_multiplier * mark_price* IMR）
// *IMR = 1/Leverage

interface ICalculateROEInputData {
  pnl: number;
  quantity: number;
  leverage: number;
  markPrice: number;
}

export const calculateROE = ({
  pnl,
  quantity,
  leverage,
  markPrice
}: ICalculateROEInputData) => {
  const imr = 1 / leverage;
  return pnl / (Math.abs(quantity) * markPrice * imr);
};
