import { ItemsViewModelFollowDetailsListItem } from "gv-api-web";
import followApi from "services/api-client/follow-api";
import { ActionType } from "utils/types";

export const FOLLOWS = "FOLLOWS";

export const fetchFollowsAction = (
  filters: FetchSignalAssetsFilterType
): ActionType<Promise<ItemsViewModelFollowDetailsListItem>> => ({
  type: FOLLOWS,
  payload: followApi.getFollowAssets(filters)
});

export type FetchSignalAssetsFilterType = {
  sorting?:
    | "ByTitleAsc"
    | "ByTitleDesc"
    | "BySubscribersAsc"
    | "BySubscribersDesc"
    | "ByTradesAsc"
    | "ByTradesDesc"
    | "ByDrawdownAsc"
    | "ByDrawdownDesc"
    | "ByProfitAsc"
    | "ByProfitDesc"
    | "ByNewAsc"
    | "ByNewDesc";
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
