import { FundAssetPart } from "gv-api-web";
import i18next from "i18next";
import { WithTranslation } from "react-i18next";
import inputImageShape from "shared/components/form/input-image/input-image.validation";
import { convertToCurrency } from "shared/utils/currency-converter";
import { formatCurrencyValue } from "shared/utils/formatter";
import {
  assetDescriptionShape,
  assetTitleShape,
  entryFeeShape,
  exitFeeShape
} from "shared/utils/validators/validators";
import { array, number, object } from "yup";

import { FUND_CURRENCY } from "../../create-fund.constants";
import {
  CREATE_FUND_FIELDS,
  ICreateFundSettingsProps
} from "./create-fund-settings";

const createFundSettingsValidationSchema = (
  props: ICreateFundSettingsProps & WithTranslation
) => {
  const {
    t,
    rate,
    wallet,
    managerMaxEntryFee,
    managerMaxExitFee,
    minimumDepositAmount,
  } = props;
  const minDeposit = parseFloat(
    formatCurrencyValue(
      convertToCurrency(minimumDepositAmount, rate),
      FUND_CURRENCY
    )
  );
  return object().shape({
    [CREATE_FUND_FIELDS.depositAmount]: number()
      .required(
        t("manager.create-program-page.settings.validation.amount-required")
      )
      .min(
        minDeposit,
        t("manager.create-program-page.settings.validation.amount-is-zero", {
          min: minDeposit
        })
      )
      .max(
        wallet.available,
        t("manager.create-program-page.settings.validation.amount-is-large")
      ),
    [CREATE_FUND_FIELDS.logo]: inputImageShape(t),
    [CREATE_FUND_FIELDS.title]: assetTitleShape(t),
    [CREATE_FUND_FIELDS.description]: assetDescriptionShape(t),

    [CREATE_FUND_FIELDS.entryFee]: entryFeeShape(t, managerMaxEntryFee),
    [CREATE_FUND_FIELDS.exitFee]: exitFeeShape(t, managerMaxExitFee),
    [CREATE_FUND_FIELDS.assets]: assetsShape(t)
  });
};

export const assetsShape = (t: i18next.TFunction) => {
  return array()
    .test(
      CREATE_FUND_FIELDS.assets,
      t("manager.create-fund-page.settings.validation.assets-share"),
      (val: FundAssetPart[]) => {
        return val.reduce((acc, next) => acc + next.percent, 0) == 100;
      }
    )
    .required(t("manager.create-fund-page.settings.validation.assets-count"))
    .min(2, t("manager.create-fund-page.settings.validation.assets-count"));
};

export default createFundSettingsValidationSchema;
