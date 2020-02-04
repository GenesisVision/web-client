import { ItemsViewModelFollowDetailsListItem } from "gv-api-web";
import followApi from "services/api-client/follow-api";
import authService from "services/auth-service";

import { FetchSignalAssetsFilterType } from "../actions/follows-table.actions";

export const fetchFollows = (
  filters: FetchSignalAssetsFilterType
): Promise<ItemsViewModelFollowDetailsListItem> => {
  return followApi.getFollowAssets({
    ...filters,
    authorization: authService.getAuthArg()
  });
};
