import { AssetFilterType } from "./asset-type-filter/asset-type-filter.constants";
import { DateRangeFilterType } from "./date-range-filter/date-range-filter.constants";
import { EventTypeFilterType } from "./event-type-filter/event-type-filter.constants";
import { LevelFilterType } from "./level-filter/level-filter.constants";
import { SelectFilterType } from "./select-filter/select-filter.constants";
import { TagFilterType } from "./tag-filter/tag-filter.constants";

export type TFilter<T> = {
  name: string;
  value: T;
};

export interface FilterValue<T = any> {
  value: T | undefined;
  label: T;
}

export interface IInvestorEventFilterValue<T> extends FilterValue {}

export interface IManagerEventFilterValue<T> extends FilterValue {
  labelKey: string;
}

export interface SortingColumn {
  name: string;
  sortingName?: string;
}

export type FilteringType = {
  [keys: string]:
    | AssetFilterType
    | DateRangeFilterType
    | EventTypeFilterType
    | LevelFilterType
    | SelectFilterType
    | TagFilterType
    | undefined;
};
