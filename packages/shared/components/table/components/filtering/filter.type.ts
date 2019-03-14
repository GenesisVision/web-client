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
  value: T;
  label?: T;
  labelKey?: T;
}

export interface IInvestorEventFilterValue extends FilterValue {}

export interface IManagerEventFilterValue extends FilterValue {}

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
