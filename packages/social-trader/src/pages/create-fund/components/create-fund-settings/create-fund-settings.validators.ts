import inputImageShape from "components/form/input-image/input-image.validation";
import { FundAssetPart } from "gv-api-web";
import i18next from "i18next";
import { WithTranslation } from "react-i18next";
import { convertToCurrency } from "shared/utils/currency-converter";
import {
  assetDescriptionShape,
  assetTitleShape,
  entryFeeShape,
  exitFeeShape
} from "shared/utils/validators/validators";
import { formatCurrencyValue } from "utils/formatter";
import { array, lazy, number, object } from "yup";

import { FUND_CURRENCY } from "../../create-fund.constants";
import {
  CREATE_FUND_FIELDS,
  ICreateFundSettingsFormValues,
  ICreateFundSettingsProps
} from "./create-fund-settings";

const createFundSettingsValidationSchema = ({
  t,
  data: { maxExitFee, maxEntryFee, minDeposit }
}: ICreateFundSettingsProps & WithTranslation) =>
  lazy<ICreateFundSettingsFormValues>(values => {
    const minDepositInCur = convertToCurrency(
      minDeposit,
      values[CREATE_FUND_FIELDS.rate]
    );
    const minDepositInCurText = parseFloat(
      formatCurrencyValue(minDepositInCur, FUND_CURRENCY)
    );
    return object<ICreateFundSettingsFormValues>().shape({
      [CREATE_FUND_FIELDS.depositAmount]: number()
        .required(t("create-program-page.settings.validation.amount-required"))
        .min(
          minDepositInCur,
          t("create-program-page.settings.validation.amount-is-zero", {
            min: minDepositInCurText
          })
        )
        .max(
          values[CREATE_FUND_FIELDS.available],
          t("create-program-page.settings.validation.amount-is-large")
        ),
      [CREATE_FUND_FIELDS.logo]: inputImageShape(t),
      [CREATE_FUND_FIELDS.title]: assetTitleShape(t),
      [CREATE_FUND_FIELDS.description]: assetDescriptionShape(t),

      [CREATE_FUND_FIELDS.entryFee]: entryFeeShape(t, maxEntryFee),
      [CREATE_FUND_FIELDS.exitFee]: exitFeeShape(t, maxExitFee),
      [CREATE_FUND_FIELDS.assets]: assetsShape(t)
    });
  });

export const assetsShape = (t: i18next.TFunction) => {
  return array()
    .test(
      CREATE_FUND_FIELDS.assets,
      t("create-fund-page.settings.validation.assets-share"),
      (val: FundAssetPart[]) => {
        return val.reduce((acc, next) => acc + next.percent, 0) == 100;
      }
    )
    .required(t("create-fund-page.settings.validation.assets-count"))
    .min(2, t("create-fund-page.settings.validation.assets-count"));
};

export default createFundSettingsValidationSchema;
