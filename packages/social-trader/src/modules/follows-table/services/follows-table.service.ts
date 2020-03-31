import { FollowDetailsListItemItemsViewModel } from "gv-api-web";
import { api } from "services/api-client/swagger-custom-client";

import { FetchSignalAssetsFilterType } from "../actions/follows-table.actions";

export const fetchFollows = (
  filters: FetchSignalAssetsFilterType
): Promise<FollowDetailsListItemItemsViewModel> => {
  return api.follows().getFollowAssets(filters);
};
