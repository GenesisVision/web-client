import { FundAssetPart } from "gv-api-web";
import { TFunction } from "i18next";

export const assetsRules = (t: TFunction) => ({
  validate: (value: FundAssetPart[]) => {
    if (!value?.length) return t("validations.assets-count");
    if (value.length < 2) return t("validations.assets-count");
    if (value.reduce((acc, next) => acc + next.percent, 0) !== 100)
      return t("validations.assets-share");
    return true;
  }
});
