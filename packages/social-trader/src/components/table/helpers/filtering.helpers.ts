import {
  ComposeFiltersType,
  ComposeFiltersTypeFlat,
  FilteringType,
  TFilter
} from "../components/filtering/filter.type";
import { IComposeDefaultFilter } from "../components/table.types";

export const RANGE_FILTER_TYPE = "RANGE_FILTER_TYPE";
export const GENERAL_FILTER_TYPE = "GENERAL_FILTER_TYPE";

export const FilterType = {
  general: "general",
  range: "range",
  custom: "custom"
};

export enum FILTER_TYPE {
  GENERAL = "general",
  RANGE = "range",
  CUSTOM = "custom"
}

export const composeFilteringActionType = (actionType: string): string =>
  `${actionType}_FILTERING`;

export const composeFilters = (
  allFilters: IComposeDefaultFilter[],
  filtering: FilteringType
): ComposeFiltersTypeFlat => {
  if (!allFilters) return {};
  // @ts-ignore
  return allFilters.reduce((accum: ComposeFiltersType, cur) => {
    const { name = "", type, composeRequestValue } = cur;
    const processedFilterValue = processFilterValue({
      //@ts-ignore
      name,
      type,
      composeRequestValue,
      //@ts-ignore
      value: filtering[name]
    });
    if (processedFilterValue !== undefined) {
      accum = { ...accum, ...processedFilterValue };
    }
    return accum;
  }, {});
};

const processFilterValue = (filter: TFilter<any>): ComposeFiltersType => {
  let requestValue = undefined;
  switch (filter.type) {
    case FILTER_TYPE.RANGE:
      if (filter.value !== undefined) {
        requestValue = {
          [`${filter.name}Min`]: filter.value[0],
          [`${filter.name}Max`]: filter.value[1]
        };
      }
      break;
    case FILTER_TYPE.CUSTOM:
      //@ts-ignore
      const requestValues =
        filter.composeRequestValue && filter.composeRequestValue(filter.value);
      if (requestValues !== undefined) {
        if (Array.isArray(requestValues))
          requestValue = { [filter.name]: requestValues };
        else requestValue = { ...requestValues };
      }
      break;
    case FILTER_TYPE.GENERAL:
      requestValue = { [filter.name]: filter.value };
      break;
    default:
      if (filter.value !== undefined) {
        requestValue = filter.value;
      }
  }
  return requestValue;
};
//@ts-ignore
export const updateFilter = (
  oldFilters: FilteringType,
  newFilter: TFilter<any>
): FilteringType => {
  const { name, value } = newFilter;
  const existingFilterValue = oldFilters[name];
  if (JSON.stringify(existingFilterValue !== JSON.stringify(value))) {
    return {
      ...oldFilters,
      ...{ [name]: value }
    };
  }

  return oldFilters;
};
