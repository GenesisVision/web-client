export enum SORTING_DIRECTION {
  NONE = "None",
  ASC = "Asc",
  DESC = "Desc"
}

export const getSortingColumnName = (value?: string): string => {
  //@ts-ignore TODO
  if (value === undefined) return undefined;
  const sortableRegExp = `(.*)${SORTING_DIRECTION.ASC}|${SORTING_DIRECTION.DESC}$`;
  return value.replace(new RegExp(sortableRegExp), "$1");
};

export const getSortingDirection = (value?: string): SORTING_DIRECTION => {
  const isAscRegExp = `.*${SORTING_DIRECTION.ASC}$`;
  const isDescRegExp = `.*${SORTING_DIRECTION.DESC}$`;

  if (value === undefined || new RegExp(isAscRegExp).test(value))
    return SORTING_DIRECTION.ASC;
  if (new RegExp(isDescRegExp).test(value)) return SORTING_DIRECTION.DESC;
  return SORTING_DIRECTION.NONE;
};

export type ComposedRequestSortingName = "sorting";
