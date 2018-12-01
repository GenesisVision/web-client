export const composeSortingActionType = actionType => `${actionType}_SORTING`;

export const SortingDirection = {
  none: "None",
  asc: "Asc",
  desc: "Desc"
};

export const getSortingColumnName = value => {
  if (value === undefined) return undefined;
  const sortableRegExp = `(.*)${SortingDirection.asc}|${
    SortingDirection.desc
  }$`;
  return value.replace(new RegExp(sortableRegExp), "$1");
};

export const getSortingDirection = value => {
  const isAscRegExp = `.*${SortingDirection.asc}$`;
  const isDescRegExp = `.*${SortingDirection.desc}$`;

  if (new RegExp(isAscRegExp).test(value)) return SortingDirection.asc;
  if (new RegExp(isDescRegExp).test(value)) return SortingDirection.desc;
  return SortingDirection.none;
};
