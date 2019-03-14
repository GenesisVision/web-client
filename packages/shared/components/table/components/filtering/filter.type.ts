import { AssetFilterType } from "./asset-type-filter/asset-type-filter.constants";
import { DateRangeFilterType } from "./date-range-filter/date-range-filter.constants";
import { EventTypeFilterType } from "./event-type-filter/event-type-filter.constants";
import { LevelFilterType } from "./level-filter/level-filter.constants";
import { SelectFilterType } from "./select-filter/select-filter.constants";
import { TagFilterType } from "./tag-filter/tag-filter.constants";
import { FILTER_TYPE } from "../../helpers/filtering.helpers";

export type TFilter<T> = {
  name: string;
  value: T;
  composeRequestValue?(value: any): any;
  type?: FILTER_TYPE;
};

export interface SelectFilterValue<T = any> {
  value: T | undefined;
  label: T;
  labelKey?: string;
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
