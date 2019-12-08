import { UpdateRowFuncType } from "components/table/components/table.types";
import {
  FollowDetailsList,
  FundDetailsList,
  FundInvestingDetailsList,
  ProgramDetailsList,
  ProgramInvestingDetailsList
} from "gv-api-web";
import CancelablePromise from "gv-api-web/dist/cancelable-promise/CancelablePromise";
import { MiddlewareDispatch } from "utils/types";

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

export type ToggleableAssetType =
  | FollowDetailsList
  | ProgramDetailsList
  | FundDetailsList
  | ProgramInvestingDetailsList
  | FundInvestingDetailsList;
