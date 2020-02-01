import { FILTER_TYPE } from "../../helpers/filtering.helpers";
import {
  ComposedPagingName,
  ComposedPagingValue,
  ComposedSkipTakeName,
  PagingType
} from "../../helpers/paging.helpers";
import { ComposedRequestSortingName } from "../../helpers/sorting.helpers";
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
import { FundAssetFilterType } from "./fund-asset-filter/fund-asset-filter.constants";
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

export interface SelectFilterValue<T = any> {
  value: T;
  label?: T;
  labelKey?: string;
}

export interface SortingColumn {
  name: string;
  sortingName?: string;
  tooltip?: boolean;
}

export type FilteringType = {
  [keys: string]:
    | PagingType
    | AssetFilterType
    | DateRangeFilterType
    | EventTypeFilterType
    | LevelFilterType
    | SelectFilterType
    | TagFilterType
    | FundAssetFilterType
    | undefined
    | any;
};

export type ComposeFiltersAllType = {
  [keys: string]: any;
};

export type ComposeFiltersType = {
  [keys in
    | ComposedPagingName
    | ComposedRequestAssetName
    | ComposedRequestDataRangeNames
    | ComposedRequestEventTypeName
    | ComposedRequestLevelFilterNames
    | ComposedRequestTagName]?:
    | ComposedPagingValue
    | ComposedRequestAssetValue
    | ComposedRequestEventTypeValue
    | ComposedRequestTagValue
    | ComposedRequestDataRangeValue
    | ComposedRequestLevelFilterValue
    | string;
};

export type ComposeFiltersTypeFlat = {
  [keys in
    | ComposedSkipTakeName
    | ComposedRequestSortingName
    | ComposedRequestAssetName
    | ComposedRequestDataRangeNames
    | ComposedRequestEventTypeName
    | ComposedRequestLevelFilterNames
    | ComposedRequestTagName]?:
    | ComposedRequestAssetValue
    | ComposedRequestEventTypeValue
    | ComposedRequestTagValue
    | ComposedRequestDataRangeValues
    | ComposedRequestLevelFilterValues;
};

export type TDefaultFilters = IComposeDefaultFilter[];
