import { FundAssetPart } from "gv-api-web";
import { TFunction } from "i18next";
import { array, TestFunction } from "yup";

import { CREATE_FUND_FIELDS } from "./create-fund-settings";

export const assetsShape = (t: TFunction) => {
  return array()
    .test(CREATE_FUND_FIELDS.assets, t("validations.assets-share"), ((
      val: FundAssetPart[] = []
    ) => {
      return val.reduce((acc, next) => acc + next.percent, 0) === 100;
    }) as TestFunction<any>)
    .required(t("validations.assets-count"))
    .min(2, t("validations.assets-count"));
};
