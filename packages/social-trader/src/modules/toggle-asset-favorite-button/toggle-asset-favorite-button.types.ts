import { UpdateRowFuncType } from "components/table/components/table.types";
import {
  CoinsAsset,
  FollowDetailsListItem,
  FollowDetailsListItemItemsViewModel,
  FundDetailsListItem,
  FundDetailsListItemItemsViewModel,
  FundInvestingDetailsList,
  ProgramDetailsListItem,
  ProgramDetailsListItemItemsViewModel,
  ProgramInvestingDetailsList
} from "gv-api-web";
import { ApiAction, MiddlewareDispatch } from "utils/types";

export type ToggleFavoriteDispatchableType = (
  id: string,
  isFavorite: boolean
) => (dispatch: MiddlewareDispatch) => void;

export type TableToggleFavoriteType = (
  asset: ToggleableAssetType,
  updateRow: UpdateRowFuncType
) => void;

export type ToggleableAssetListType =
  | FollowDetailsListItemItemsViewModel
  | ProgramDetailsListItemItemsViewModel
  | FundDetailsListItemItemsViewModel;

export type ToggleableAssetType =
  | FollowDetailsListItem
  | ProgramDetailsListItem
  | FundDetailsListItem
  | ProgramInvestingDetailsList
  | FundInvestingDetailsList
  | CoinsAsset;

export type FavoriteActionProps = { id: string };

type FavoriteActionMeta = {
  id: string;
  isFavorite: boolean;
};
export interface FavoriteActionType<T = any> extends ApiAction<T> {
  meta: FavoriteActionMeta;
}
