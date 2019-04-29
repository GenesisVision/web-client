import { ProgramInvestInfo } from "gv-api-web";
import investorApi from "shared/services/api-client/investor-api";
import notificationsApi from "shared/services/api-client/notifications-api";
import { ApiAction } from "shared/utils/types";

export const fetchInvestmentInfo = ({
  assetId,
  currency,
  authorisation
}: {
  assetId: string;
  currency: string;
  authorisation: string;
}): ApiAction<ProgramInvestInfo> => ({
  type: "FETCH_PROGRAM_INVESTMENT_INFO",
  payload: investorApi.v10InvestorProgramsByIdInvestInfoByCurrencyGet(
    assetId,
    currency,
    authorisation
  )
});

export const subscribeAvailable = ({
  assetId,
  amount,
  authorisation
}: {
  assetId: string;
  amount: number;
  authorisation: string;
}): ApiAction<string> => ({
  type: "FETCH_PROGRAM_INVESTMENT_INFO",
  payload: notificationsApi.v10NotificationsSettingsAddPost(authorisation, {
    assetId,
    conditionType: "AvailableToInvest",
    type: "ProgramCondition",
    conditionAmount: amount
  })
});
