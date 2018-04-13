import { dafaultState } from "../reducers/paging-reducers";

export const composePaingActionType = actionType => `${actionType}_PAGING`;

export const calculateTotalPages = (
  itemsCount,
  itemsOnPage = dafaultState.itemsOnPage
) => {
  if (itemsCount === 0) return 0;
  return Math.ceil(itemsCount / itemsOnPage);
};

export const calculateSkipAndTake = paging => {
  const skip = paging.itemsOnPage * paging.currentPage;
  const take = paging.itemsOnPage;
  return { skip, take };
};
