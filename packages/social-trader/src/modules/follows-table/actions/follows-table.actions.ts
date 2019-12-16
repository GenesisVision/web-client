import {
  CancelablePromise,
  ItemsViewModelFollowDetailsListItem
} from "gv-api-web";
import followApi from "services/api-client/follow-api";
import { ActionType } from "utils/types";

export const FOLLOWS = "FOLLOWS";

export const fetchFollowsAction = (
  filters: FetchSignalAssetsFilterType
): ActionType<CancelablePromise<ItemsViewModelFollowDetailsListItem>> => ({
  type: FOLLOWS,
  payload: followApi.getFollowAssets(filters)
});

export type FetchSignalAssetsFilterType = {
  isFavorite?: boolean;
  authorization?: string;
  tags?: Array<string>;
  dateFrom?: Date;
  dateTo?: Date;
  chartPointsCount?: number;
  facetId?: string;
  mask?: string;
  showFavorites?: boolean;
  skip?: number;
  take?: number;
};
