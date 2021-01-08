export enum ADD_API_KEY_FORM_FIELDS {
  isIpRestrict = "isIpRestrict",
  allowedIps = "allowedIps",
  isTradingEnabled = "isTradingEnabled",
  twoFactorCode = "twoFactorCode",
  title = "title",
  id = "id"
}

export interface IApiKeyFormValues {
  [ADD_API_KEY_FORM_FIELDS.isIpRestrict]: boolean;
  [ADD_API_KEY_FORM_FIELDS.allowedIps]: Array<string>;
  [ADD_API_KEY_FORM_FIELDS.isTradingEnabled]: boolean;
  [ADD_API_KEY_FORM_FIELDS.twoFactorCode]?: string;
  [ADD_API_KEY_FORM_FIELDS.title]: string;
  [ADD_API_KEY_FORM_FIELDS.id]: string;
}
