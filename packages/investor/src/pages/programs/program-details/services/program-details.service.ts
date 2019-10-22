import investorApi from "shared/services/api-client/investor-api";
import notificationsApi from "shared/services/api-client/notifications-api";
import authService from "shared/services/auth-service";
import { CurrencyEnum } from "shared/utils/types";

export const getInvestmentInfoAction = ({
  assetId,
  currency
}: {
  assetId: string;
  currency: CurrencyEnum;
}) =>
  investorApi
    .getProgramInvestInfo(assetId, currency, authService.getAuthArg())
    .then(({ programCurrencyMinInvestment }) =>
      notificationsApi.addNotificationsSettings(authService.getAuthArg(), {
        assetId,
        conditionType: "AvailableToInvest",
        type: "ProgramCondition",
        conditionAmount: programCurrencyMinInvestment
      })
    );
