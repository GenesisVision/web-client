import { ItemsViewModelRewardDetails } from "gv-api-web";
import { FilteringType } from "shared/components/table/components/filtering/filter.type";
import { REFERRAL_HISTORY } from "shared/reducers/profile-reducer";
import partnershipApi from "shared/services/api-client/partnership-api";
import { ApiAction } from "shared/utils/types";

export const referralHistoryTableAction = (
  auth: string,
  filters: FilteringType
): ApiAction<ItemsViewModelRewardDetails> => ({
  type: REFERRAL_HISTORY,
  payload: partnershipApi.getRewardsHistory(auth, filters)
});
