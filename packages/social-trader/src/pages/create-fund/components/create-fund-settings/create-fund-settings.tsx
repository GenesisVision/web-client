import useAssetValidate from "components/assets/asset-validate.hook";
import CreateAssetNavigation from "components/assets/fields/create-asset-navigation";
import DepositDetailsBlock from "components/assets/fields/deposit-details-block";
import DescriptionBlock from "components/assets/fields/description-block";
import FeesSettings from "components/assets/fields/fees-settings";
import { IImageValue } from "components/form/input-image/input-image";
import SettingsBlock from "components/settings-block/settings-block";
import { ASSET } from "constants/constants";
import {
  withBlurLoader,
  WithBlurLoaderProps
} from "decorators/with-blur-loader";
import { InjectedFormikProps, withFormik } from "formik";
import { FundCreateAssetPlatformInfo, WalletData } from "gv-api-web";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import { SetSubmittingType } from "utils/types";

import { FUND_CURRENCY } from "../../create-fund.constants";
import { AssetsField } from "./assets-field";
import createFundSettingsValidationSchema from "./create-fund-settings.validators";

const _CreateFundSettings: React.FC<Props> = ({
  setFieldTouched,
  setFieldValue,
  handleSubmit,
  isValid,
  t,
  isSubmitting,
  values: { depositAmount, description, enterMinDeposit },
  data: { maxExitFee, maxEntryFee, minDeposit }
}) => {
  const validateAndSubmit = useAssetValidate({ handleSubmit, isValid });
  return (
    <form onSubmit={validateAndSubmit}>
      <SettingsBlock
        label={t("create-fund-page.settings.main-settings")}
        blockNumber={"01"}
      >
        <DescriptionBlock
          asset={ASSET.FUND}
          titleName={CREATE_FUND_FIELDS.title}
          descriptionName={CREATE_FUND_FIELDS.description}
          logoName={CREATE_FUND_FIELDS.logo}
          description={description}
        />
      </SettingsBlock>
      <SettingsBlock
        label={t("create-fund-page.settings.asset-selection")}
        blockNumber={"02"}
      >
        <AssetsField name={CREATE_FUND_FIELDS.assets} />
      </SettingsBlock>
      <SettingsBlock
        label={t("create-fund-page.settings.fees-settings")}
        blockNumber={"03"}
      >
        <FeesSettings
          entryFeeName={CREATE_FUND_FIELDS.entryFee}
          entryFeeDescription={t(
            "create-fund-page.settings.hints.entry-fee-description",
            { maxFee: maxEntryFee }
          )}
          secondFeeName={CREATE_FUND_FIELDS.exitFee}
          secondFeeLabel={t("create-fund-page.settings.fields.exit-fee")}
          secondFeeUnderText={t("create-fund-page.settings.hints.exit-fee")}
          secondFeeDescription={t(
            "create-fund-page.settings.hints.exit-fee-description",
            {
              maxFee: maxExitFee
            }
          )}
        />
      </SettingsBlock>
      <DepositDetailsBlock
        setFieldTouched={setFieldTouched}
        enterMinDeposit={enterMinDeposit}
        enterMinDepositName={CREATE_FUND_FIELDS.enterMinDeposit}
        availableName={CREATE_FUND_FIELDS.available}
        rateName={CREATE_FUND_FIELDS.rate}
        blockNumber={4}
        walletFieldName={CREATE_FUND_FIELDS.depositWalletId}
        inputName={CREATE_FUND_FIELDS.depositAmount}
        depositAmount={depositAmount}
        minimumDepositAmount={minDeposit}
        setFieldValue={setFieldValue}
        assetCurrency={FUND_CURRENCY}
      />
      <CreateAssetNavigation asset={ASSET.FUND} isSubmitting={isSubmitting} />
    </form>
  );
};

export enum CREATE_FUND_FIELDS {
  enterMinDeposit = "enterMinDeposit",
  available = "available",
  rate = "rate",
  depositWalletId = "depositWalletId",
  depositAmount = "depositAmount",
  entryFee = "entryFee",
  logo = "logo",
  description = "description",
  title = "title",
  assets = "assets",
  exitFee = "exitFee"
}

export interface ICreateFundSettingsFormValues {
  [CREATE_FUND_FIELDS.enterMinDeposit]?: boolean;
  [CREATE_FUND_FIELDS.available]: number;
  [CREATE_FUND_FIELDS.rate]: number;
  [CREATE_FUND_FIELDS.depositWalletId]: string;
  [CREATE_FUND_FIELDS.depositAmount]?: number;
  [CREATE_FUND_FIELDS.entryFee]?: number;
  [CREATE_FUND_FIELDS.logo]: IImageValue;
  [CREATE_FUND_FIELDS.description]: string;
  [CREATE_FUND_FIELDS.title]: string;
  [CREATE_FUND_FIELDS.assets]: Array<any>;
  [CREATE_FUND_FIELDS.exitFee]?: number;
}

export interface ICreateFundSettingsProps extends WithTranslation, OwnProps {}

type Props = InjectedFormikProps<
  ICreateFundSettingsProps,
  ICreateFundSettingsFormValues
>;

const CreateFundSettings = compose<
  React.ComponentType<
    OwnProps & WithBlurLoaderProps<FundCreateAssetPlatformInfo>
  >
>(
  withBlurLoader,
  translate(),
  withFormik<ICreateFundSettingsProps, ICreateFundSettingsFormValues>({
    displayName: "CreateFundSettingsForm",
    mapPropsToValues: () => ({
      [CREATE_FUND_FIELDS.available]: 0,
      [CREATE_FUND_FIELDS.rate]: 1,
      [CREATE_FUND_FIELDS.depositWalletId]: "",
      [CREATE_FUND_FIELDS.depositAmount]: undefined,
      [CREATE_FUND_FIELDS.entryFee]: undefined,
      [CREATE_FUND_FIELDS.logo]: {},
      [CREATE_FUND_FIELDS.description]: "",
      [CREATE_FUND_FIELDS.title]: "",
      [CREATE_FUND_FIELDS.assets]: [],
      [CREATE_FUND_FIELDS.exitFee]: undefined
    }),
    validationSchema: createFundSettingsValidationSchema,
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  })
)(_CreateFundSettings);
export default CreateFundSettings;

interface OwnProps {
  wallets: WalletData[];
  data: FundCreateAssetPlatformInfo;
  onSubmit: (
    values: ICreateFundSettingsFormValues,
    setSubmitting: SetSubmittingType
  ) => void;
}
