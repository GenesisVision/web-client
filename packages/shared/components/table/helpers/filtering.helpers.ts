import {
  IDefaultFilter,
  IFilter,
  IFiltering,
  RequestFiltersType
} from "../components/filtering/filter.type";

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

export const composeFilters = <TFiltering, TRequestFiltering>(
  allFilters: IDefaultFilter<TFiltering>[],
  filtering: IFiltering<TFiltering>
): TRequestFiltering => {
  //@ts-ignore
  return allFilters.reduce((accum, cur) => {
    const { name = "", type, composeRequestValue } = cur;
    const processedFilterValue = processFilterValue({
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

export interface IProcessedFilter<T> {
  name: string;
  type: FILTER_TYPE;
  value: T;
  composeRequestValue: any;
}

const processFilterValue = <TFiltering extends {} & { [key: string]: any }>(
  filter: IProcessedFilter<TFiltering>
) => {
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

export const updateFilter = <
  TOldFilters extends { [key: string]: any },
  TFilter
>(
  oldFilters: IFiltering<TOldFilters>,
  newFilter: IFilter<TFilter>
): IFiltering<TOldFilters> => {
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
