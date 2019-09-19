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
    .v10InvestorProgramsByIdInvestInfoByCurrencyGet(
      assetId,
      currency,
      authService.getAuthArg()
    )
    .then(({ minInvestmentAmount }) =>
      notificationsApi.v10NotificationsSettingsAddPost(
        authService.getAuthArg(),
        {
          assetId,
          conditionType: "AvailableToInvest",
          type: "ProgramCondition",
          conditionAmount: minInvestmentAmount
        }
      )
    );
