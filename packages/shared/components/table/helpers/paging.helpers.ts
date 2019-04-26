import { DEFAULT_PAGING } from "../reducers/table-paging.reducer";

export interface IPaging {
  currentPage: number;
  totalPages?: number;
  totalItems?: number;
  itemsOnPage: number;
}

export type PagingRequestType = {
  skip: number;
  take: number;
};

export const composePagingActionType = (actionType: string): string =>
  `${actionType}_PAGING`;

export const calculateTotalPages = (
  itemsCount: number,
  itemsOnPage: DEFAULT_PAGING = DEFAULT_PAGING.itemsOnPage
): number => {
  if (itemsCount === 0) return 0;
  return Math.ceil(itemsCount / itemsOnPage);
};

export const calculateSkipAndTake = (paging: IPaging): PagingRequestType => {
  const skip = paging.itemsOnPage * (paging.currentPage - 1);
  const take = paging.itemsOnPage;
  return { skip, take };
};
