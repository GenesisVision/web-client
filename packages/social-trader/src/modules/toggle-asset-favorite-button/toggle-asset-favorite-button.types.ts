import { UpdateRowFuncType } from "components/table/components/table.types";
import {
  FollowDetailsListItem,
  FundDetailsListItem,
  FundInvestingDetailsList,
  ItemsViewModelFollowDetailsListItem,
  ItemsViewModelFundDetailsListItem,
  ItemsViewModelProgramDetailsListItem,
  ProgramDetailsListItem,
  ProgramInvestingDetailsList
} from "gv-api-web";
import { ApiAction, MiddlewareDispatch } from "utils/types";

export type ToggleFavoriteDispatchableType = (
  id: string,
  isFavorite: boolean
) => (dispatch: MiddlewareDispatch) => void;

export type MethodType = (id: string, authorization: string) => Promise<null>;

export type TableToggleFavoriteType = (
  asset: ToggleableAssetType,
  updateRow: UpdateRowFuncType
) => void;

export type ToggleableAssetListType =
  | ItemsViewModelFollowDetailsListItem
  | ItemsViewModelProgramDetailsListItem
  | ItemsViewModelFundDetailsListItem;

export type ToggleableAssetType =
  | FollowDetailsListItem
  | ProgramDetailsListItem
  | FundDetailsListItem
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
