import brokersApi from "services/api-client/brokers-api";
import { api } from "services/api-client/swagger-custom-client";
import authService from "services/auth-service";

import { IAttachAccountSettingsFormValues } from "../components/attach-account-settings/attach-account-settings";

export const attachAccount = (body: IAttachAccountSettingsFormValues) =>
  api.assets().createExternalTradingAccount({
    body
  });

export const fetchExchanges = () =>
  api
    .brokers()
    .getBrokersExternal()
    .then(({ brokers }) => brokers);
