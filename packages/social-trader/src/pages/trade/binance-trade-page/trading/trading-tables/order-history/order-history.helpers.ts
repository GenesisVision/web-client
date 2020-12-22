import { SortingColumn } from "components/table/components/filtering/filter.type";
import { BinanceExecutionType, BinanceOrderStatus } from "gv-api-web";

export const isOrderDeleted = (
  orderStatus?: BinanceOrderStatus,
  executionType?: BinanceExecutionType
): boolean => {
  switch (orderStatus?.toLowerCase()) {
    case "expired":
    case "filled":
    case "canceled":
      return true;
  }
  switch (executionType?.toLowerCase()) {
    case "canceled":
    case "expired":
      return true;
  }
  return false;
};

export const ORDER_HISTORY_TABLE_COLUMNS: SortingColumn[] = [
  {
    name: "date"
  },
  {
    name: "pair"
  },
  {
    name: "type"
  },
  {
    name: "side"
  },
  {
    name: "price"
  },
  {
    name: "executed"
  },
  {
    name: "amount"
  },
  {
    name: "total"
  },
  {
    name: "trigger conditions"
  },
  {
    name: "status"
  }
];
