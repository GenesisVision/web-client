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
import { array, lazy, number, object, Schema, string, TestFunction } from "yup";

import {
  CREATE_FUND_FIELDS,
  ICreateFundSettingsFormValues
} from "./create-fund-settings";

const createFundSettingsValidationSchema = ({
  selfManaged,
  available,
  rate,
  wallets,
  t,
  data: { maxExitFee, maxEntryFee, minDeposit }
}: {
  selfManaged?: boolean;
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
        .required(t("validations.amount-required"))
        .min(
          minDepositInCurText,
          t("validations.amount-is-zero", {
            min: minDepositInCurText
          })
        )
        .max(available, t("validations.amount-is-large")),
      [CREATE_FUND_FIELDS.logo]: inputImageShape(t),
      [CREATE_FUND_FIELDS.title]: assetTitleShape(t), // TODO remove
      [CREATE_FUND_FIELDS.description]: selfManaged
        ? string()
        : assetDescriptionShape(t),
      [CREATE_FUND_FIELDS.entryFee]: selfManaged
        ? number()
        : entryFeeShape(t, maxEntryFee),
      [CREATE_FUND_FIELDS.exitFee]: selfManaged
        ? number()
        : exitFeeShape(t, maxExitFee),
      [CREATE_FUND_FIELDS.assets]: assetsShape(t)
    }) as Schema<ICreateFundSettingsFormValues>;
  });

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

export default createFundSettingsValidationSchema;
