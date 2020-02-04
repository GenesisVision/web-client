import { PartnershipDetails } from "gv-api-web";
import { REFERRAL_DETAILS } from "reducers/profile-reducer";
import partnershipApi from "services/api-client/partnership-api";
import { ApiAction, CurrencyEnum } from "utils/types";

export const referralDetailsAction = (
  auth: string,
  currency: CurrencyEnum
): ApiAction<PartnershipDetails> => ({
  type: REFERRAL_DETAILS,
  payload: partnershipApi.getDetails(auth, { currency })
});
