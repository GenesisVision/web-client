import { api } from "services/api-client/swagger-custom-client";

export const getApiKeys = (id: string) => api.assets().getAccountApiKey(id);

export const addApiKey = ({
  id,
  ...body
}: {
  isIpRestrict: boolean;
  allowedIps: Array<string>;
  isTradingEnabled: boolean;
  twoFactorCode: string;
  title: string;
  id: string;
}) => {
  return api.assets().createAccountApiKey(id, { body });
};

export const editApiKey = ({
  id,
  ...body
}: {
  isIpRestrict: boolean;
  allowedIps: Array<string>;
  isTradingEnabled: boolean;
  twoFactorCode: string;
  id: string;
}) => {
  return api.assets().editAccountApiKeyRestrictions(id, { body });
};

export const deleteApiKey = (id: string) => {
  return api.assets().deleteAccountApiKey(id);
};
