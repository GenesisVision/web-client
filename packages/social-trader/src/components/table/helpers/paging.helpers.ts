import { DEFAULT_PAGING } from "../reducers/table-paging.reducer";

export interface IPaging {
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  itemsOnPage?: number;
}
export interface ISkipAndTake {
  skip: number;
  take: number;
}

export const composePagingActionType = (actionType: string): string =>
  `${actionType}_PAGING`;

export const calculateTotalPages = (
  itemsCount: number,
  itemsOnPage: DEFAULT_PAGING = DEFAULT_PAGING.itemsOnPage
): number => {
  if (itemsCount === 0) return 0;
  return Math.ceil(itemsCount / itemsOnPage);
};

export const calculateSkipAndTake = (paging: IPaging): ISkipAndTake => {
  const { itemsOnPage = 10, currentPage = 1 } = paging;
  const skip = itemsOnPage * (currentPage - 1);
  const take = itemsOnPage;
  return { skip, take };
};

export type ComposedSkipTakeName = "skip" | "take";
export type ComposedPagingName = "paging";
export type PagingType = IPaging;
export type ComposedPagingValue = PagingType;
