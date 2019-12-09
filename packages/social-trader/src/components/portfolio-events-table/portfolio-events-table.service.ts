import { SelectFilterValue } from "components/table/components/filtering/filter.type";
import { EventFilters } from "gv-api-web";

export const getEventTypes = (
  allEventTypes: EventFilters,
  historyType: THistoryType,
  assetType: "allAssets" | "programDetails" | "fundDetails"
): SelectFilterValue<string>[] =>
  allEventTypes[historyType]["programDetails"].map(({ key, title }) => ({
    value: key,
    labelKey: title
  }));

export type THistoryType = "investingHistory" | "tradingHistory";
