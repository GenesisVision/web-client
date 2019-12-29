import { FilteringType } from "components/table/components/filtering/filter.type";
import { ItemsViewModelRewardDetails } from "gv-api-web";
import { REFERRAL_HISTORY } from "reducers/profile-reducer";
import partnershipApi from "services/api-client/partnership-api";
import { ApiAction } from "utils/types";

export const referralHistoryTableAction = (
  auth: string,
  filters: FilteringType
): ApiAction<ItemsViewModelRewardDetails> => ({
  type: REFERRAL_HISTORY,
  payload: partnershipApi.getRewardsHistory(auth, filters)
});
