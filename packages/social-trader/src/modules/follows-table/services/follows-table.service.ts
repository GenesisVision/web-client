import { FollowDetailsListItemItemsViewModel } from "gv-api-web";
import { api } from "services/api-client/swagger-custom-client";
import Token from "services/api-client/token";

export const fetchFollows = (
  filters: any, // FetchSignalAssetsFilterType,
  token?: Token
): Promise<FollowDetailsListItemItemsViewModel> => {
  return api.follows(token).getFollowAssets(filters);
};
