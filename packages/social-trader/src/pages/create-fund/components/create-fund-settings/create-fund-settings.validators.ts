import inputImageShape from "components/form/input-image/input-image.validation";
import {
  FundAssetPart,
  FundCreateAssetPlatformInfo,
  WalletData
} from "gv-api-web";
import { TFunction } from "i18next";
import { convertToCurrency } from "utils/currency-converter";
import { formatCurrencyValue } from "utils/formatter";
import { safeGetElemFromArray } from "utils/helpers";
import {
  assetDescriptionShape,
  assetTitleShape,
  entryFeeShape,
  exitFeeShape
} from "utils/validators/validators";
import { array, lazy, number, object } from "yup";

import {
  CREATE_FUND_FIELDS,
  ICreateFundSettingsFormValues
} from "./create-fund-settings";

const createFundSettingsValidationSchema = ({
  available,
  rate,
  wallets,
  t,
  data: { maxExitFee, maxEntryFee, minDeposit }
}: {
  available: number;
  rate: number;
  wallets: WalletData[];
  data: FundCreateAssetPlatformInfo;
  t: TFunction;
}) =>
  lazy<ICreateFundSettingsFormValues>(values => {
    const wallet = safeGetElemFromArray(
      wallets,
      ({ id }) => id === values[CREATE_FUND_FIELDS.depositWalletId]
    );
    const minDepositInCur = convertToCurrency(minDeposit, rate);
    const minDepositInCurText = parseFloat(
      formatCurrencyValue(minDepositInCur, wallet.currency)
    );
    return object<ICreateFundSettingsFormValues>().shape({
      [CREATE_FUND_FIELDS.depositAmount]: number()
        .required(t("create-program-page.settings.validation.amount-required"))
        .min(
          minDepositInCurText,
          t("create-program-page.settings.validation.amount-is-zero", {
            min: minDepositInCurText
          })
        )
        .max(
          available,
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

export const assetsShape = (t: TFunction) => {
  return array()
    .test(
      CREATE_FUND_FIELDS.assets,
      t("create-fund-page.settings.validation.assets-share"),
      (val: FundAssetPart[] = []) => {
        return val.reduce((acc, next) => acc + next.percent, 0) === 100;
      }
    )
    .required(t("create-fund-page.settings.validation.assets-count"))
    .min(2, t("create-fund-page.settings.validation.assets-count"));
};

export default createFundSettingsValidationSchema;
