import { SORTING_DIRECTION } from "components/table/helpers/sorting.helpers";
import { AnyObjectType } from "utils/types";

export type TradeTableSortingType = {
  dataType: "number" | "string";
  field: keyof AnyObjectType;
  direction: SORTING_DIRECTION;
};
