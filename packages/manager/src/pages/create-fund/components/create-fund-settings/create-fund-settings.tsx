import "shared/components/deposit-details/deposit-details.scss";

import "./create-fund-settings.scss";

import CreateAssetSection from "components/create-asset/create-asset-section/create-asset-section";
import DescriptionBlock from "components/create-asset/fields/description-block";
import FeesSettings from "components/create-asset/fields/fees-settings";
import { InjectedFormikProps, withFormik } from "formik";
import { FundAssetPart, WalletData } from "gv-api-web";
import CreateAssetNavigation from "pages/create-program/components/create-program-settings/fields/create-asset-navigation";
import DepositDetailsBlock from "pages/create-program/components/create-program-settings/fields/deposit-details-block";
import * as React from "react";
import { useEffect } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { useDispatch } from "react-redux";
import { compose } from "redux";
import { IImageValue } from "shared/components/form/input-image/input-image";
import { ASSET } from "shared/constants/constants";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import { CurrencyEnum, SetSubmittingType } from "shared/utils/types";

import { AssetsField } from "./assets-field";
import createFundSettingsValidationSchema from "./create-fund-settings.validators";

const _CreateFundSettings: React.FC<Props> = ({
  onWalletChange,
  validateForm,
  setFieldValue,
  handleSubmit,
  isValid,
  fundCurrency,
  wallets,
  wallet,
  t,
  navigateBack,
  isSubmitting,
  values: { depositAmount, description },
  managerMaxExitFee,
  managerMaxEntryFee,
  rate,
  minimumDepositAmount
}) => {
  const dispatch = useDispatch();
  useEffect(
    () => {
      setFieldValue(CREATE_FUND_FIELDS.depositWalletId, wallet.id);
      setFieldValue(CREATE_FUND_FIELDS.depositAmount, "");
    },
    [wallet]
  );
  useEffect(
    () => {
      validateForm();
    },
    [rate]
  );

  const validateAndSubmit = (
    e?: React.FormEvent<HTMLFormElement> | undefined
  ): void => {
    handleSubmit(e);
    if (isValid) handleSubmit(e);
    else
      dispatch(
        alertMessageActions.error(
          t("manager.create-program-page.notifications.validate-error")
        )
      );
    if (e) e.preventDefault();
  };

  return (
    <div className="create-fund-settings">
      <form onSubmit={validateAndSubmit}>
        <CreateAssetSection
          title={t("manager.create-fund-page.settings.main-settings")}
          blockNumber={"01"}
        >
          <DescriptionBlock
            asset={ASSET.FUND}
            titleName={CREATE_FUND_FIELDS.title}
            descriptionName={CREATE_FUND_FIELDS.description}
            logoName={CREATE_FUND_FIELDS.logo}
            description={description}
          />
        </CreateAssetSection>
        <CreateAssetSection
          title={t("manager.create-fund-page.settings.asset-selection")}
          blockNumber={"02"}
        >
          <AssetsField name={CREATE_FUND_FIELDS.assets} />
        </CreateAssetSection>
        <CreateAssetSection
          title={t("manager.create-fund-page.settings.fees-settings")}
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
        </CreateAssetSection>
        <DepositDetailsBlock
          blockNumber={4}
          walletFieldName={CREATE_FUND_FIELDS.depositWalletId}
          inputName={CREATE_FUND_FIELDS.depositAmount}
          depositAmount={depositAmount}
          minimumDepositAmount={minimumDepositAmount}
          wallets={wallets}
          rate={rate}
          setFieldValue={setFieldValue}
          onWalletChange={onWalletChange}
          assetCurrency={fundCurrency}
          walletAvailable={wallet.available}
          walletCurrency={wallet.currency}
        />
        <CreateAssetNavigation
          asset={ASSET.FUND}
          navigateBack={navigateBack}
          isSubmitting={isSubmitting}
        />
      </form>
    </div>
  );
};

export enum CREATE_FUND_FIELDS {
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
  [CREATE_FUND_FIELDS.depositWalletId]: string;
  [CREATE_FUND_FIELDS.depositAmount]?: number;
  [CREATE_FUND_FIELDS.entryFee]?: number;
  [CREATE_FUND_FIELDS.logo]: IImageValue;
  [CREATE_FUND_FIELDS.description]: string;
  [CREATE_FUND_FIELDS.title]: string;
  [CREATE_FUND_FIELDS.assets]: FundAssetPart[];
  [CREATE_FUND_FIELDS.exitFee]?: number;
}

export interface ICreateFundSettingsProps extends WithTranslation, OwnProps {}

type Props = InjectedFormikProps<
  ICreateFundSettingsProps,
  ICreateFundSettingsFormValues
>;

const CreateFundSettings = compose<
  React.ComponentType<OwnProps & WithLoaderProps>
>(
  withLoader,
  translate(),
  withFormik<ICreateFundSettingsProps, ICreateFundSettingsFormValues>({
    displayName: "CreateFundSettingsForm",
    mapPropsToValues: ({ wallet }) => {
      return {
        [CREATE_FUND_FIELDS.depositWalletId]: wallet.id,
        [CREATE_FUND_FIELDS.depositAmount]: undefined,
        [CREATE_FUND_FIELDS.entryFee]: undefined,
        [CREATE_FUND_FIELDS.logo]: {},
        [CREATE_FUND_FIELDS.description]: "",
        [CREATE_FUND_FIELDS.title]: "",
        [CREATE_FUND_FIELDS.assets]: [],
        [CREATE_FUND_FIELDS.exitFee]: undefined
      };
    },
    validationSchema: createFundSettingsValidationSchema,
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  })
)(_CreateFundSettings);
export default CreateFundSettings;

interface OwnProps {
  fundCurrency: CurrencyEnum;
  managerMaxExitFee: number;
  managerMaxEntryFee: number;
  wallets: WalletData[];
  wallet: WalletData;
  navigateBack(): void;
  author: string;
  onWalletChange(walletId: string): void;
  minimumDepositAmount: number;
  onSubmit(
    values: ICreateFundSettingsFormValues,
    setSubmitting: SetSubmittingType
  ): void;
  rate: number;
}
