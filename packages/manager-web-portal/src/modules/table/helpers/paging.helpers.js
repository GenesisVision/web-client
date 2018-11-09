import { DEFAULT_PAGING } from "../reducers/table-paging.reducer";

export const composePaingActionType = actionType => `${actionType}_PAGING`;

export const calculateTotalPages = (
  itemsCount,
  itemsOnPage = DEFAULT_PAGING.itemsOnPage
) => {
  if (itemsCount === 0) return 0;
  return Math.ceil(itemsCount / itemsOnPage);
};

export const calculateSkipAndTake = paging => {
  const skip = paging.itemsOnPage * (paging.currentPage - 1);
  const take = paging.itemsOnPage;
  return { skip, take };
};
