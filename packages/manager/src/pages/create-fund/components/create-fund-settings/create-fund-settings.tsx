import "shared/components/deposit-details/deposit-details.scss";

import "./create-fund-settings.scss";

import { InjectedFormikProps, withFormik } from "formik";
import { FundAssetPart, PlatformAsset, WalletData } from "gv-api-web";
import ReallocateField from "pages/funds/fund-settings/reallocation/components/reallocate-field";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import NumberFormat, { NumberFormatValues } from "react-number-format";
import { compose } from "redux";
import InputImage, {
  IImageValue
} from "shared/components/form/input-image/input-image";
import GVButton from "shared/components/gv-button";
import GVFormikField from "shared/components/gv-formik-field";
import GVProgramPeriod from "shared/components/gv-program-period";
import GVTextField from "shared/components/gv-text-field";
import Hint from "shared/components/hint/hint";
import InputAmountField from "shared/components/input-amount-field/input-amount-field";
import { VERTICAL_POPOVER_POS } from "shared/components/popover/popover";
import { ISelectChangeEvent } from "shared/components/select/select";
import WalletSelect from "shared/components/wallet-select/wallet-select";
import FundDefaultImage from "shared/media/program-default-image.svg";
import { convertFromCurrency } from "shared/utils/currency-converter";
import { formatCurrencyValue, validateFraction } from "shared/utils/formatter";
import { allowValuesNumberFormat } from "shared/utils/helpers";
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

  setMaxAmount = (available: number, currency: string) => () => {
    const { setFieldValue } = this.props;
    setFieldValue(
      CREATE_FUND_FIELDS.depositAmount,
      formatCurrencyValue(available, currency)
    );
  };

  validateAndSubmit = (e?: React.FormEvent<HTMLFormElement> | undefined) => {
    const { t, isValid, handleSubmit, notifyError } = this.props;
    handleSubmit(e);

    if (!isValid) {
      notifyError(t("manager.create-fund-page.notifications.validate-error"));
      if (e) e.preventDefault();
    }
  };

  isAmountAllow = (currency: CurrencyEnum) => ({ value }: NumberFormatValues) =>
    validateFraction(value, currency);

  render() {
    const {
      fundCurrency,
      wallets,
      wallet,
      t,
      navigateBack,
      author,
      isSubmitting,
      values,
      managerMaxExitFee,
      managerMaxEntryFee,
      rate,
      minimumDepositAmount,
      assets
    } = this.props;
    const { depositAmount, description, title } = values;
    const descriptionTrimmedLength = description.trim().length;

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
              <div className="create-fund-settings__item create-fund-settings__item--wider">
                <GVFormikField
                  type="text"
                  name={CREATE_FUND_FIELDS.title}
                  label={t("manager.create-fund-page.settings.fields.name")}
                  autoComplete="off"
                  component={GVTextField}
                />
                <div className="create-fund-settings__item-caption">
                  <span className="create-fund-settings__description create-fund-settings__description-requirements">
                    {t(
                      "manager.create-fund-page.settings.fields.name-requirements"
                    )}
                  </span>
                </div>
              </div>
              <div className="create-fund-settings__item create-fund-settings__item--wider">
                <GVFormikField
                  type="textarea"
                  name={CREATE_FUND_FIELDS.description}
                  label={t(
                    "manager.create-fund-page.settings.fields.description"
                  )}
                  component={GVTextField}
                />
                <div className="create-fund-settings__item-caption create-fund-settings__description">
                  <span className="create-fund-settings__description-requirements">
                    {t(
                      "manager.create-fund-page.settings.fields.description-requirements"
                    )}
                  </span>
                  {descriptionTrimmedLength > 0 && (
                    <div className="create-fund-settings__description-chars">
                      <div className="create-fund-settings__description-chars-value">
                        {descriptionTrimmedLength}
                      </div>
                      <GVProgramPeriod
                        start={0}
                        end={500}
                        value={descriptionTrimmedLength}
                        variant="pie"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="create-fund-settings__item">
                <div className="create-fund-settings__logo-title">
                  {t("manager.create-fund-page.settings.fields.upload-logo")}
                </div>
                <div className="create-fund-settings__logo-notice">
                  {t(
                    "manager.create-fund-page.settings.fields.upload-logo-rules"
                  )}
                </div>
              </div>
              <div className="create-fund-settings__item create-fund-settings__item--wider">
                <div className="create-fund-settings__logo-section">
                  <div className="create-fund-settings__file-field-container">
                    <GVFormikField
                      name="logo"
                      component={InputImage}
                      defaultImage={FundDefaultImage}
                    />
                  </div>
                  <div className="create-fund-settings__image-info">
                    <div className="create-fund-settings__image-title">
                      {title}
                    </div>
                    <div className="create-fund-settings__image-author">
                      {author}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="create-fund-settings__subheading">
            <span className="create-fund-settings__block-number">02</span>
            {t("manager.create-fund-page.settings.asset-selection")}
          </div>
          <div className="create-fund-settings__fill-block create-fund-settings__fill-block--with-border">
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
            <div className="create-fund-settings__row">
              <div className="create-fund-settings__item">
                <GVFormikField
                  name={CREATE_FUND_FIELDS.entryFee}
                  label={t(
                    "manager.create-fund-page.settings.fields.entry-fee"
                  )}
                  adornment="%"
                  component={GVTextField}
                  InputComponent={NumberFormat}
                  autoComplete="off"
                  decimalScale={4}
                  isAllowed={allowValuesNumberFormat({
                    from: 0,
                    to: managerMaxEntryFee
                  })}
                />
                <Hint
                  content={t(
                    "manager.create-program-page.settings.hints.entry-fee"
                  )}
                  className="create-fund-settings__item-caption"
                  vertical={VERTICAL_POPOVER_POS.BOTTOM}
                  tooltipContent={t(
                    "manager.create-fund-page.settings.hints.entry-fee-description",
                    { maxFee: managerMaxEntryFee }
                  )}
                />
              </div>
              <div className="create-fund-settings__item">
                <GVFormikField
                  name={CREATE_FUND_FIELDS.exitFee}
                  label={t("manager.create-fund-page.settings.fields.exit-fee")}
                  adornment="%"
                  component={GVTextField}
                  InputComponent={NumberFormat}
                  autoComplete="off"
                  decimalScale={4}
                  isAllowed={allowValuesNumberFormat({
                    from: 0,
                    to: managerMaxExitFee
                  })}
                />
                <Hint
                  content={t(
                    "manager.create-fund-page.settings.hints.exit-fee"
                  )}
                  className="create-fund-settings__item-caption"
                  vertical={VERTICAL_POPOVER_POS.BOTTOM}
                  tooltipContent={t(
                    "manager.create-fund-page.settings.hints.exit-fee-description",
                    {
                      maxFee: managerMaxExitFee
                    }
                  )}
                />
              </div>
            </div>
          </div>
          <div className="create-fund-settings__subheading">
            <span className="create-fund-settings__block-number">04</span>
            {t("manager.create-fund-page.settings.deposit-details")}
          </div>
          <div className={"deposit-details create-fund-settings__fill-block"}>
            <div className="create-program-settings__field deposit-details">
              <WalletSelect
                name={CREATE_FUND_FIELDS.depositWalletId}
                label={t("transfer.from")}
                items={wallets}
                onChange={this.onChangeDepositWallet}
              />
              <InputAmountField
                autoFocus={false}
                name={CREATE_FUND_FIELDS.depositAmount}
                label={t("transfer.amount")}
                currency={wallet.currency}
                isAllow={this.isAmountAllow(wallet.currency)}
                setMax={this.setMaxAmount(wallet.available, wallet.currency)}
              />
              {fundCurrency !== wallet.currency && depositAmount && (
                <div className="invest-popup__currency">
                  <NumberFormat
                    value={formatCurrencyValue(
                      convertFromCurrency(depositAmount, rate),
                      fundCurrency
                    )}
                    prefix="≈ "
                    suffix={` ${fundCurrency}`}
                    displayType="text"
                  />
                </div>
              )}
              <div className="deposit-details__available-list">
                <div className="deposit-details__available-amount">
                  {t("manager.create-program-page.settings.fields.min-deposit")}
                  <span className={"deposit-details__available-amount-value"}>
                    <NumberFormat
                      value={minimumDepositAmount}
                      thousandSeparator=" "
                      displayType="text"
                      suffix={` ${fundCurrency}`}
                    />
                  </span>
                </div>
                <div className="deposit-details__available-amount">
                  {t(
                    "manager.create-fund-page.settings.fields.available-in-wallet"
                  )}
                  <span className={"deposit-details__available-amount-value"}>
                    <NumberFormat
                      value={wallet.available}
                      thousandSeparator=" "
                      displayType="text"
                      suffix={` ${wallet.currency}`}
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="create-fund-settings__navigation">
            <GVButton
              title={t("buttons.create-fund")}
              color="primary"
              type="submit"
              disabled={isSubmitting}
            >
              {t("buttons.create-fund")}
            </GVButton>
            <GVButton
              variant="text"
              onClick={navigateBack}
              className="create-fund-settings__navigation-back"
            >
              <>&larr; {t("buttons.back")}</>
            </GVButton>
          </div>
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
  fundCurrency: string;
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
