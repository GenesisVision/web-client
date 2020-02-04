import { SelectFilterValue } from "components/table/components/filtering/filter.type";
import { EventFilters, EventTradingItemFilters } from "gv-api-web";

export const getEventTypes = (
  allEventTypes: EventFilters,
  historyType: THistoryType,
  assetType: AssetType
): SelectFilterValue<string>[] =>
  (allEventTypes[historyType] as EventTradingItemFilters)[
    assetType.toLowerCase() as AssetType
  ].map(({ key, title }) => ({
    value: key,
    labelKey: title
  }));

type AssetType = "follow" | "all" | "program" | "fund";
export type THistoryType = "investmentHistory" | "tradingHistory";
