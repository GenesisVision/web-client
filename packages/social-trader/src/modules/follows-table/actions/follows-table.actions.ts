import { FollowDetailsListItemItemsViewModel } from "gv-api-web";
import { api } from "services/api-client/swagger-custom-client";
import { ActionType } from "utils/types";

export const FOLLOWS = "FOLLOWS";

export const fetchFollowsAction = (
  filters: FetchSignalAssetsFilterType
): ActionType<Promise<FollowDetailsListItemItemsViewModel>> => ({
  type: FOLLOWS,
  payload: api.follows().getFollowAssets(filters)
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
