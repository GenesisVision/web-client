import { FILTER_TYPE } from "../helpers/filtering.helpers";
import { IPaging } from "../helpers/paging.helpers";
import { FilteringType } from "./filtering/filter.type";
import { IDataModel } from "shared/constants/constants";
import { FundDetails, ProgramDetails } from "gv-api-web";
import { Action } from "redux";

export type Column = {
  name: string;
};

export interface IUpdateFilterFunc {
  (filter: any): void;
}
export type UpdateRowFuncType = (row: any) => void;

export type GetItemsFuncType = (filters?: FilteringType) => Promise<IDataModel>;

export type GetItemsFuncVoidType = (filters?: FilteringType) => void;

export type GetItemsFuncActionType = (filters: FilteringType) => Action;

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
  filtering?: FilteringType;
  sorting?: string;
};
