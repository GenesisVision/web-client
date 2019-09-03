import "shared/components/deposit-details/deposit-details.scss";

import "./create-fund-settings.scss";

import { InjectedFormikProps, withFormik } from "formik";
import { FundAssetPart, PlatformAsset, WalletData } from "gv-api-web";
import CreateAssetNavigation from "pages/create-program/components/create-program-settings/fields/create-asset-navigation";
import DepositDetailsBlock from "pages/create-program/components/create-program-settings/fields/deposit-details-block";
import ReallocateField from "pages/funds/fund-settings/reallocation/components/reallocate-field";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import DescriptionBlock from "shared/components/fields/description-block";
import FeesSettings from "shared/components/fields/fees-settings";
import { IImageValue } from "shared/components/form/input-image/input-image";
import GVFormikField from "shared/components/gv-formik-field";
import { ISelectChangeEvent } from "shared/components/select/select";
import { ASSET } from "shared/constants/constants";
import { CurrencyEnum, SetSubmittingType } from "shared/utils/types";

import createFundSettingsValidationSchema from "./create-fund-settings.validators";

class _CreateFundSettings extends React.PureComponent<
  InjectedFormikProps<ICreateFundSettingsProps, ICreateFundSettingsFormValues>
> {
  componentDidUpdate(prevProps: ICreateFundSettingsProps) {
    const { validateForm, setFieldValue } = this.props;
    if (prevProps.wallet !== this.props.wallet) {
      setFieldValue(CREATE_FUND_FIELDS.depositWalletId, this.props.wallet.id);
      setFieldValue(CREATE_FUND_FIELDS.depositAmount, "");
    }
    if (prevProps.rate !== this.props.rate) {
      validateForm();
    }
  }

  onChangeDepositWallet = (name: ISelectChangeEvent, target: JSX.Element) => {
    this.props.onWalletChange(target.props.value);
  };

  validateAndSubmit = (e?: React.FormEvent<HTMLFormElement> | undefined) => {
    const { t, isValid, handleSubmit, notifyError } = this.props;
    handleSubmit(e);

    if (!isValid) {
      notifyError(t("manager.create-fund-page.notifications.validate-error"));
      if (e) e.preventDefault();
    }
  };

  render() {
    const {
      setFieldValue,
      fundCurrency,
      wallets,
      wallet,
      t,
      navigateBack,
      isSubmitting,
      values,
      managerMaxExitFee,
      managerMaxEntryFee,
      rate,
      minimumDepositAmount,
      assets
    } = this.props;
    const { depositAmount, description } = values;

    return (
      <div className="create-fund-settings">
        <form
          className="create-fund-settings__form"
          onSubmit={this.validateAndSubmit}
        >
          <div className="create-fund-settings__subheading">
            <span className="create-fund-settings__block-number">01</span>
            {t("manager.create-fund-page.settings.main-settings")}
          </div>
          <div className="create-fund-settings__fill-block create-fund-settings__fill-block--with-border">
            <div className="create-fund-settings__row">
              <DescriptionBlock
                asset={ASSET.FUND}
                titleName={CREATE_FUND_FIELDS.title}
                descriptionName={CREATE_FUND_FIELDS.description}
                logoName={CREATE_FUND_FIELDS.logo}
                description={description}
              />
            </div>
          </div>
          <div className="create-fund-settings__subheading">
            <span className="create-fund-settings__block-number">02</span>
            {t("manager.create-fund-page.settings.asset-selection")}
          </div>
          <div className="create-fund-settings__fill-block create-fund-settings__fill-block--with-border">
            <div className="create-asset-settings__text">
              {t("manager.create-fund-page.settings.fields.mandatory-assets")}
            </div>
            <GVFormikField
              name={CREATE_FUND_FIELDS.assets}
              component={ReallocateField}
              assets={assets}
            />
          </div>
          <div className="create-fund-settings__subheading">
            <span className="create-fund-settings__block-number">03</span>
            {t("manager.create-fund-page.settings.fees-settings")}
          </div>
          <div className="create-fund-settings__fill-block create-fund-settings__fill-block--with-border">
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
          </div>
          <DepositDetailsBlock
            blockNumber={4}
            walletFieldName={CREATE_FUND_FIELDS.depositWalletId}
            inputName={CREATE_FUND_FIELDS.depositAmount}
            depositAmount={depositAmount}
            minimumDepositAmount={minimumDepositAmount}
            wallets={wallets}
            rate={rate}
            setFieldValue={setFieldValue}
            onWalletChange={this.onChangeDepositWallet}
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
  }
}

const CreateFundSettings = compose<React.ComponentType<OwnProps>>(
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
  assets: PlatformAsset[];
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
  notifyError(message: string): void;
}

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
