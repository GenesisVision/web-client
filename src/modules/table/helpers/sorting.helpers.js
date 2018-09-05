export const composeSortingActionType = actionType => `${actionType}_SORTING`;

export const getSortingColumnName = value =>
  value.replace(/(.*)Asc|Desc$/, "$1");

export const isSortingAsc = value => /.*Asc$/.test(value);
export const isSortingDesc = value => /.*Desc$/.test(value);
