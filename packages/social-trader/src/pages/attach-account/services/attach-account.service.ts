import assetsApi from "shared/services/api-client/assets-api";
import brokersApi from "shared/services/api-client/brokers-api";
import authService from "shared/services/auth-service";

import { IAttachAccountSettingsFormValues } from "../components/attach-account-settings/attach-account-settings";

export const attachAccount = (request: IAttachAccountSettingsFormValues) =>
  assetsApi.createExternalTradingAccount(authService.getAuthArg(), {
    request
  });

export const fetchExchanges = () =>
  brokersApi.getBrokersExternal().then(({ brokers }) => brokers);
