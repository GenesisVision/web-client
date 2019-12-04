import assetsApi from "services/api-client/assets-api";
import brokersApi from "services/api-client/brokers-api";
import authService from "services/auth-service";

import { IAttachAccountSettingsFormValues } from "../components/attach-account-settings/attach-account-settings";

export const attachAccount = (request: IAttachAccountSettingsFormValues) =>
  assetsApi.createExternalTradingAccount(authService.getAuthArg(), {
    request
  });

export const fetchExchanges = () =>
  brokersApi.getBrokersExternal().then(({ brokers }) => brokers);
