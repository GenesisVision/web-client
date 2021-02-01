import { TFunction } from "i18next";

export const codeValidator = (t: TFunction) => (value: string) => {
  const trimmedValue = value.trim();
  if (!trimmedValue?.length) return t("validations.three-factor-required");
  if (!/^\d{6}$/.test(trimmedValue))
    return t("validations.three-factor-6digits");
  return true;
};
