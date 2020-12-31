import { TFunction } from "i18next";
import { object, string } from "yup";

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

export const AddApiKeyFormValidationSchema = (
  t: TFunction,
  showTitle?: boolean
) =>
  object().shape({
    [ADD_API_KEY_FORM_FIELDS.title]: showTitle
      ? string()
          .test(
            ADD_API_KEY_FORM_FIELDS.title,
            "Must be less 30 characters",
            val => !!val && val.length <= 30
          )
          .required()
      : string()
  });
