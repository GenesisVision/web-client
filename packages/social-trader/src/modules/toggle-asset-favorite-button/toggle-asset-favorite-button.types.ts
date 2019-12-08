import { UpdateRowFuncType } from "components/table/components/table.types";
import {
  FollowDetailsList,
  FundDetailsList,
  FundInvestingDetailsList,
  ItemsViewModelFollowDetailsList,
  ItemsViewModelFundDetailsList,
  ItemsViewModelProgramDetailsList,
  ProgramDetailsList,
  ProgramInvestingDetailsList
} from "gv-api-web";
import CancelablePromise from "gv-api-web/dist/cancelable-promise/CancelablePromise";
import { ApiAction, MiddlewareDispatch } from "utils/types";

export type ToggleFavoriteDispatchableType = (
  id: string,
  isFavorite: boolean
) => (dispatch: MiddlewareDispatch) => void;

export type MethodType = (
  id: string,
  authorization: string
) => CancelablePromise<null>;

export type TableToggleFavoriteType = (
  asset: ToggleableAssetType,
  updateRow: UpdateRowFuncType
) => void;

export type ToggleableAssetListType =
  | ItemsViewModelFollowDetailsList
  | ItemsViewModelProgramDetailsList
  | ItemsViewModelFundDetailsList;

export type ToggleableAssetType =
  | FollowDetailsList
  | ProgramDetailsList
  | FundDetailsList
  | ProgramInvestingDetailsList
  | FundInvestingDetailsList;

export type FavoriteActionProps = { id: string };

type FavoriteActionMeta = {
  id: string;
  isFavorite: boolean;
};
export interface FavoriteActionType<T = any> extends ApiAction<T> {
  meta: FavoriteActionMeta;
}
