import { FundDetails, ProgramDetails } from "gv-api-web";
import { Action } from "redux";

import { FILTER_TYPE } from "../helpers/filtering.helpers";
import { IDataModel } from "../helpers/mapper";
import { IPaging } from "../helpers/paging.helpers";
import { IFilter } from "./filtering/filter.type";

export type Column = {
  name: string;
};

export interface IUpdateFilterFunc {
  (filter: IFilter<any>): void;
}
export type UpdateItemsFuncType = () => void;

export type UpdateRowFuncType<T> = (row: T) => void;

export type GetItemsFuncType<TFilters, TItem> = (
  filters?: TFilters
) => Promise<IDataModel<TItem>>;

export type GetItemsFuncActionType = (filters: any) => Action;

export type TableToggleFavoriteType<T> = (
  asset: ProgramDetails | FundDetails,
  updateRow: UpdateRowFuncType<T>
) => (assetId: string, isFavorite: boolean) => void;

export interface IComposeDefaultFilter {
  name?: string;
  composeRequestValue?(value: any): Object;
  composeApiRequestValue?(value: any): Object; // temp
  defaultValue?: any;
  type?: FILTER_TYPE;
  validate?(value: any): boolean;
}

export type FiltersType = {
  paging?: IPaging;
  filtering?: any;
  sorting?: string;
};

export type RenderBodyItemFuncType<T> = (
  item: T,
  updateRow?: UpdateRowFuncType<T>,
  updateItems?: UpdateItemsFuncType
) => JSX.Element;

export type RenderFiltersFuncType<T> = (
  updateFilter: IUpdateFilterFunc,
  filtering: T
) => JSX.Element;
