import { TradingAccountPwdUpdate } from "gv-api-web";
import { api, Token } from "services/api-client/swagger-custom-client";

export const changePasswordTradingAccount = ({
  id,
  model
}: {
  id: string;
  model?: TradingAccountPwdUpdate;
}) =>
  api.assets().changeTradingAccountPassword(id, {
    body: model
  });
