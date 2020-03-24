import { FollowDetailsListItemItemsViewModel } from "gv-api-web";
import followApi from "services/api-client/follow-api";

import { FetchSignalAssetsFilterType } from "../actions/follows-table.actions";

export const fetchFollows = (
  filters: FetchSignalAssetsFilterType
): Promise<FollowDetailsListItemItemsViewModel> => {
  return followApi.getFollowAssets(filters);
};
