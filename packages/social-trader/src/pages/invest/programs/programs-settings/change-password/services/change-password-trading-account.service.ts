import assetsApi from "services/api-client/assets-api";
import authService from "services/auth-service";

export const changePasswordTradingAccount = ({
  id,
  model
}: {
  id: string;
  model?: any;
}) =>
  assetsApi.changeTradingAccountPassword(id, authService.getAuthArg(), {
    body: model
  });
