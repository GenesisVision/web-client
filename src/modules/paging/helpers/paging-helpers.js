const ITEMS_ON_PAGE = 10;

export const composePaingActionType = actionType => `${actionType}_PAGING`;

export const calculateTotalPages = (
  itemsCount,
  itemsOnPage = ITEMS_ON_PAGE
) => {
  if (itemsCount === 0) return 0;
  return Math.ceil(itemsCount / itemsOnPage);
};

export const calculateSkipAndTake = paging => {
  const skip = paging.itemsOnPage * paging.currentPage;
  const take = paging.itemsOnPage;
  return { skip, take };
};
