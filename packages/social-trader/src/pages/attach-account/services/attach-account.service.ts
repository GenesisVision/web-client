import assetsApi from "services/api-client/assets-api";
import brokersApi from "services/api-client/brokers-api";
import authService from "services/auth-service";

import { IAttachAccountSettingsFormValues } from "../components/attach-account-settings/attach-account-settings";

export const attachAccount = (body: IAttachAccountSettingsFormValues) =>
  assetsApi.createExternalTradingAccount(authService.getAuthArg(), {
    body
  });

export const fetchExchanges = () =>
  brokersApi.getBrokersExternal().then(({ brokers }) => brokers);
