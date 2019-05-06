import { FundDetails, ProgramDetails } from "gv-api-web";
import { Action } from "redux";
import { IDataModel } from "shared/constants/constants";
import { MiddlewareDispatch, TGetState } from "shared/utils/types";

import { FILTER_TYPE } from "../helpers/filtering.helpers";
import { IPaging } from "../helpers/paging.helpers";
import { FilteringType, SortingColumn, TFilter } from "./filtering/filter.type";

export type Column = {
  name: string;
};

export type UpdateFilterFunc = (filter: TFilter<any>) => void;

export type UpdateItemsFuncType = () => void;

export type UpdateRowFuncType = (row: any) => void;

export type GetItemsFuncType = (filters?: FilteringType) => Promise<IDataModel>;

export type GetItemsFuncActionType = (filters: FilteringType) => Action;

export type TableToggleFavoriteType = (
  asset: ProgramDetails | FundDetails,
  updateRow: UpdateRowFuncType
) => TableToggleFavoriteHandlerType;

export type TableToggleFavoriteHandlerType = (
  assetId: string,
  isFavorite: boolean
) => void;

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
  filtering?: FilteringType;
  sorting?: string;
};

export type RenderBodyItemFuncType = (
  item: any,
  updateRow?: UpdateRowFuncType,
  updateItems?: UpdateItemsFuncType
) => JSX.Element;

export type RenderFiltersFuncType = (
  updateFilter: IUpdateFilterFunc,
  filtering: FilteringType
) => JSX.Element;

export type UpdateSortingFuncType = (
  opt: string
) => ((dispatch: MiddlewareDispatch, getState: TGetState) => void) | void;

export type RenderSortingFuncType = (
  value: SortingColumn
) => JSX.Element | string;

export type UpdatePagingFuncType = (page: number) => void;
