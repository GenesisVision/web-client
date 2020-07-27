import { GuidesCategoryItemsViewModel } from "gv-api-web";
import { api } from "services/api-client/swagger-custom-client";
import Token from "services/api-client/token";
import { ApiAction } from "utils/types";

export const GUIDES = "GUIDES";

interface FetchGuidesAction extends ApiAction<GuidesCategoryItemsViewModel> {
  type: typeof GUIDES;
}

export const fetchGuidesAction = (token?: Token): FetchGuidesAction => {
  return {
    type: GUIDES,
    payload: api.guides(token).getGuides()
  };
};
