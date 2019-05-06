import { FILTER_TYPE } from "../../helpers/filtering.helpers";
import { IComposeDefaultFilter } from "../table.types";
import {
  AssetFilterType,
  ComposedRequestAssetName,
  ComposedRequestAssetValue
} from "./asset-type-filter/asset-type-filter.constants";
import {
  ComposedRequestDataRangeNames,
  ComposedRequestDataRangeValue,
  ComposedRequestDataRangeValues,
  DateRangeFilterType
} from "./date-range-filter/date-range-filter.constants";
import {
  ComposedRequestEventTypeName,
  ComposedRequestEventTypeValue,
  EventTypeFilterType
} from "./event-type-filter/event-type-filter.constants";
import {
  ComposedRequestLevelFilterNames,
  ComposedRequestLevelFilterValue,
  ComposedRequestLevelFilterValues,
  LevelFilterType
} from "./level-filter/level-filter.constants";
import { SelectFilterType } from "./select-filter/select-filter.constants";
import {
  ComposedRequestTagName,
  ComposedRequestTagValue,
  TagFilterType
} from "./tag-filter/tag-filter.constants";

type TFilterMain = {
  name: string;
  composeRequestValue?(value: any): any;
  type?: FILTER_TYPE;
};

export interface TFilter<T = any> extends TFilterMain {
  value: T;
}

export interface TDefaultFilter<T = any> extends TFilterMain {
  defaultValue: T;
}

export interface SelectFilterValue<T = any> {
  value: T | undefined;
  label?: T;
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

export type ComposeFiltersAllType = {
  [keys: string]: any;
};

export type ComposeFiltersType = {
  [keys in
    | ComposedRequestAssetName
    | ComposedRequestDataRangeNames
    | ComposedRequestEventTypeName
    | ComposedRequestLevelFilterNames
    | ComposedRequestTagName]?:
    | ComposedRequestAssetValue
    | ComposedRequestEventTypeValue
    | ComposedRequestTagValue
    | ComposedRequestDataRangeValue
    | ComposedRequestLevelFilterValue
    | string
};

export type ComposeFiltersTypeFlat = {
  [keys in
    | ComposedRequestAssetName
    | ComposedRequestDataRangeNames
    | ComposedRequestEventTypeName
    | ComposedRequestLevelFilterNames
    | ComposedRequestTagName]?:
    | ComposedRequestAssetValue
    | ComposedRequestEventTypeValue
    | ComposedRequestTagValue
    | ComposedRequestDataRangeValues
    | ComposedRequestLevelFilterValues
};

export type TDefaultFilters = IComposeDefaultFilter[];

export type TDefaults = {
  defaultFilters: TDefaultFilters;
  type: string;
};
