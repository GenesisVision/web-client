import {
  CancelablePromise,
  ItemsViewModelCopyTradingDetailsList
} from "gv-api-web";
import followApi from "shared/services/api-client/follow-api";
import { ActionType } from "shared/utils/types";

export const FOLLOWS = "FOLLOWS";

export const fetchFollowsAction = (
  filters: FetchSignalAssetsFilterType
): ActionType<CancelablePromise<ItemsViewModelCopyTradingDetailsList>> => ({
  type: FOLLOWS,
  payload: followApi.getFollowAssets(filters)
});

export type FetchSignalAssetsFilterType = {
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
