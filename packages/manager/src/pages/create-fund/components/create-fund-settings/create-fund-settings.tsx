import "shared/components/deposit-details/deposit-details.scss";
import "./create-fund-settings.scss";

import useCreateAssetValidate from "components/create-asset/create-asset-validate.hook";
import DescriptionBlock from "components/create-asset/fields/description-block";
import FeesSettings from "components/create-asset/fields/fees-settings";
import { InjectedFormikProps, withFormik } from "formik";
import { PlatformInfoOld } from "gv-api-web";
import CreateAssetNavigation from "pages/create-program/components/create-program-settings/fields/create-asset-navigation";
import DepositDetailsBlock from "pages/create-program/components/create-program-settings/fields/deposit-details-block";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import { IImageValue } from "shared/components/form/input-image/input-image";
import SettingsBlock from "shared/components/settings-block/settings-block";
import { ASSET } from "shared/constants/constants";
import {
  withBlurLoader,
  WithBlurLoaderProps
} from "shared/decorators/with-blur-loader";
import { SetSubmittingType } from "shared/utils/types";

import { FUND_CURRENCY } from "../../create-fund.constants";
import { AssetsField } from "./assets-field";
import createFundSettingsValidationSchema from "./create-fund-settings.validators";

const _CreateFundSettings: React.FC<Props> = ({
  validateForm,
  setFieldValue,
  handleSubmit,
  isValid,
  t,
  isSubmitting,
  values: { depositAmount, description, depositWalletId },
  data: {
    programsInfo: { managerMaxEntryFee, managerMaxExitFee }
  },
  minimumDepositAmount
}) => {
  const validateAndSubmit = useCreateAssetValidate({ handleSubmit, isValid });
  return (
    <form onSubmit={validateAndSubmit}>
      <SettingsBlock
        label={t("manager.create-fund-page.settings.main-settings")}
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
        label={t("manager.create-fund-page.settings.asset-selection")}
        blockNumber={"02"}
      >
        <AssetsField name={CREATE_FUND_FIELDS.assets} />
      </SettingsBlock>
      <SettingsBlock
        label={t("manager.create-fund-page.settings.fees-settings")}
        blockNumber={"03"}
      >
        <FeesSettings
          entryFeeName={CREATE_FUND_FIELDS.entryFee}
          entryFeeDescription={t(
            "manager.create-fund-page.settings.hints.entry-fee-description",
            { maxFee: managerMaxEntryFee }
          )}
          secondFeeName={CREATE_FUND_FIELDS.exitFee}
          secondFeeLabel={t(
            "manager.create-fund-page.settings.fields.exit-fee"
          )}
          secondFeeUnderText={t(
            "manager.create-fund-page.settings.hints.exit-fee"
          )}
          secondFeeDescription={t(
            "manager.create-fund-page.settings.hints.exit-fee-description",
            {
              maxFee: managerMaxExitFee
            }
          )}
        />
      </SettingsBlock>
      <DepositDetailsBlock
        availableName={CREATE_FUND_FIELDS.available}
        rateName={CREATE_FUND_FIELDS.rate}
        blockNumber={4}
        walletFieldName={CREATE_FUND_FIELDS.depositWalletId}
        inputName={CREATE_FUND_FIELDS.depositAmount}
        depositAmount={depositAmount}
        minimumDepositAmount={minimumDepositAmount}
        setFieldValue={setFieldValue}
        assetCurrency={FUND_CURRENCY}
      />
      <CreateAssetNavigation asset={ASSET.FUND} isSubmitting={isSubmitting} />
    </form>
  );
};

export enum CREATE_FUND_FIELDS {
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
  React.ComponentType<OwnProps & WithBlurLoaderProps<PlatformInfoOld>>
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
  data: PlatformInfoOld;
  minimumDepositAmount: number;
  onSubmit: (
    values: ICreateFundSettingsFormValues,
    setSubmitting: SetSubmittingType
  ) => void;
}
