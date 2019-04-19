import { FundDetails, ProgramDetails } from "gv-api-web";
import { Action } from "redux";
import { IDataModel } from "shared/constants/constants";

import { FILTER_TYPE } from "../helpers/filtering.helpers";
import { IPaging } from "../helpers/paging.helpers";
import { IFilter, RequestFiltersType } from "./filtering/filter.type";

export type Column = {
  name: string;
};

export interface IUpdateFilterFunc {
  (filter: IFilter<any>): void;
}
export type UpdateItemsFuncType = () => void;

export type UpdateRowFuncType = (row: any) => void;

export type GetItemsFuncType<T> = (filters?: T) => Promise<IDataModel>;

export type GetItemsFuncActionType = (filters: any) => Action;

export type TableToggleFavoriteType = (
  asset: ProgramDetails | FundDetails,
  updateRow: UpdateRowFuncType
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

export type RenderBodyItemFuncType = (
  item: any,
  updateRow?: UpdateRowFuncType,
  updateItems?: UpdateItemsFuncType
) => JSX.Element;

export type RenderFiltersFuncType<T> = (
  updateFilter: IUpdateFilterFunc,
  filtering: T
) => JSX.Element;
