import "shared/components/deposit-details/deposit-details.scss";

import "./create-program-settings.scss";

import { InjectedFormikProps, withFormik } from "formik";
import {
  Broker,
  BrokerAccountType,
  ProgramsInfo,
  WalletData
} from "gv-api-web";
import {
  GVButton,
  GVFormikField,
  GVProgramPeriod,
  GVTextField
} from "gv-react-components";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import NumberFormat, { NumberFormatValues } from "react-number-format";
import { compose } from "redux";
import InputImage, {
  IImageValue
} from "shared/components/form/input-image/input-image";
import GVCheckbox from "shared/components/gv-checkbox/gv-checkbox";
import Hint from "shared/components/hint/hint";
import InputAmountField from "shared/components/input-amount-field/input-amount-field";
import { VERTICAL_POPOVER_POS } from "shared/components/popover/popover";
import Select from "shared/components/select/select";
import ProgramDefaultImage from "shared/media/program-default-image.svg";
import filesService from "shared/services/file-service";
import { convertFromCurrency } from "shared/utils/currency-converter";
import { formatCurrencyValue, validateFraction } from "shared/utils/formatter";
import { allowValuesNumberFormat } from "shared/utils/helpers";
import { CurrencyEnum } from "shared/utils/types";

import createProgramSettingsValidationSchema from "./create-program-settings.validators";
import SignalsFeeFormPartial from "./signals-fee-form.partial";

class CreateProgramSettings extends React.PureComponent<
  InjectedFormikProps<
    ICreateProgramSettingsProps,
    ICreateProgramSettingsFormValues
  >
> {
  componentDidUpdate(prevProps: ICreateProgramSettingsProps) {
    const { validateForm, setFieldValue } = this.props;
    if (prevProps.accountType !== this.props.accountType) {
      setFieldValue("brokerAccountTypeId", this.props.accountType!.id);
    }
    if (prevProps.programCurrency !== this.props.programCurrency) {
      setFieldValue("currency", this.props.programCurrency || "");
    }
    if (prevProps.leverage !== this.props.leverage) {
      setFieldValue("leverage", this.props.leverage || "");
    }
    if (prevProps.wallet !== this.props.wallet) {
      setFieldValue("depositWalletId", this.props.wallet.id);
      setFieldValue("depositAmount", "");
    }
    if (prevProps.leverage !== this.props.leverage) {
      setFieldValue("leverage", this.props.leverage || "");
    }
    if (prevProps.rate !== this.props.rate) {
      validateForm();
    }
  }

  onSelectChange = (onChangeFn: (value: string & number) => void) => (
    _: string,
    target: any
  ) => {
    onChangeFn(target.props.value);
  };

  setMaxAmount = (available?: number, currency?: string) => () => {
    if (!available || !currency) return;
    const { setFieldValue } = this.props;
    setFieldValue("depositAmount", formatCurrencyValue(available, currency));
  };

  validateAndSubmit = (
    e?: React.FormEvent<HTMLFormElement> | undefined
  ): void => {
    const { t, isValid, handleSubmit, notifyError } = this.props;
    handleSubmit(e);
    if (!isValid) {
      notifyError(
        t("manager.create-program-page.notifications.validate-error")
      );
      if (e) e.preventDefault();
    }
  };
  isAmountAllow = (currency: CurrencyEnum) => ({ value }: NumberFormatValues) =>
    validateFraction(value, currency);

  render() {
    const {
      minimumDepositsAmount,
      wallets,
      t,
      navigateBack,
      broker,
      author,
      isSubmitting,
      values,
      setFieldValue,
      programsInfo,
      errors,
      accountType,
      rate,
      programCurrency,
      wallet
    } = this.props;
    const { depositAmount, isSignalProgram, description, title } = values;
    const descriptionTrimmedLength = description.trim().length;

    const accountCurrencies = accountType ? accountType.currencies : [];
    const accountLeverages = accountType ? accountType.leverages : [];

    return (
      <div className="create-program-settings">
        <form
          className="create-program-settings__form"
          onSubmit={this.validateAndSubmit}
        >
          <div className="create-program-settings__subheading">
            <span className="create-program-settings__block-number">01</span>
            {t("manager.create-program-page.settings.main-settings")}
          </div>
          <div className="create-program-settings__fill-block create-program-settings__fill-block--with-border">
            <div className="create-program-settings__row">
              <div className="create-program-settings__item">
                <GVFormikField
                  type="text"
                  name="title"
                  label={t("manager.create-program-page.settings.fields.name")}
                  autoComplete="off"
                  component={GVTextField}
                />
                <div className="create-program-settings__item-caption">
                  {t(
                    "manager.create-program-page.settings.fields.name-requirements"
                  )}
                </div>
              </div>
              <div className="create-program-settings__item">
                <GVFormikField
                  name="brokerAccountTypeId"
                  component={GVTextField}
                  label={t(
                    "manager.create-program-page.settings.fields.account-type"
                  )}
                  InputComponent={Select}
                  disableIfSingle
                  onChange={this.onSelectChange(this.props.changeAccountType)}
                >
                  {broker.accountTypes.map(accountType => {
                    return (
                      <option value={accountType.id} key={accountType.id}>
                        {accountType.type}
                      </option>
                    );
                  })}
                </GVFormikField>
              </div>
              <div className="create-program-settings__item">
                <GVFormikField
                  name="currency"
                  component={GVTextField}
                  label={t(
                    "manager.create-program-page.settings.fields.currency"
                  )}
                  InputComponent={Select}
                  disabled={accountType === undefined}
                  disableIfSingle
                  onChange={this.onSelectChange(this.props.changeCurrency)}
                >
                  {accountCurrencies.map(currency => {
                    return (
                      <option value={currency} key={currency}>
                        {currency}
                      </option>
                    );
                  })}
                </GVFormikField>
              </div>
              <div className="create-program-settings__item create-program-settings__item--wider">
                <GVFormikField
                  type="textarea"
                  name="description"
                  label={t(
                    "manager.create-program-page.settings.fields.description"
                  )}
                  component={GVTextField}
                />
                <div className="create-program-settings__item-caption create-program-settings__description">
                  <span className="create-program-settings__description-requirements">
                    {t(
                      "manager.create-program-page.settings.fields.description-requirements"
                    )}
                  </span>
                  {descriptionTrimmedLength > 0 && (
                    <span className="create-program-settings__description-chars">
                      {descriptionTrimmedLength}
                      <GVProgramPeriod
                        start={0}
                        end={500}
                        value={descriptionTrimmedLength}
                        variant="pie"
                      />
                    </span>
                  )}
                </div>
              </div>
              <div className="create-program-settings__item">
                <GVFormikField
                  name="leverage"
                  component={GVTextField}
                  label={t(
                    "manager.create-program-page.settings.fields.brokers-leverage"
                  )}
                  InputComponent={Select}
                  disabled={!accountType}
                  disableIfSingle
                  className="create-program-settings__leverage"
                  onChange={this.onSelectChange(this.props.changeLeverage)}
                >
                  {accountLeverages.map(leverage => {
                    return (
                      <option value={leverage} key={leverage}>
                        {leverage}
                      </option>
                    );
                  })}
                </GVFormikField>
              </div>
              <div className="create-program-settings__item">
                <GVFormikField
                  name="periodLength"
                  component={GVTextField}
                  label={t(
                    "manager.create-program-page.settings.fields.period"
                  )}
                  InputComponent={Select}
                >
                  {programsInfo.periods.map(period => {
                    return (
                      <option value={period} key={period}>
                        {period +
                          " " +
                          t(
                            "manager.create-program-page.settings.fields.period-option-notation.day",
                            { count: period }
                          )}
                      </option>
                    );
                  })}
                </GVFormikField>
              </div>
              <div className="create-program-settings__item">
                <GVFormikField
                  name="stopOutLevel"
                  label={t(
                    "manager.create-program-page.settings.fields.stop-out-level"
                  )}
                  adornment="%"
                  component={GVTextField}
                  InputComponent={NumberFormat}
                  autoComplete="off"
                  decimalScale={4}
                />
                <Hint
                  content={t(
                    "manager.create-program-page.settings.hints.stop-out-level"
                  )}
                  className="create-program-settings__item-caption"
                  vertical={VERTICAL_POPOVER_POS.BOTTOM}
                  tooltipContent={t(
                    "manager.create-program-page.settings.hints.stop-out-level-description"
                  )}
                />
              </div>
              <div className="create-program-settings__item create-program-settings__item--wider">
                <div className="create-program-settings__logo-title">
                  {t("manager.create-program-page.settings.fields.upload-logo")}
                </div>
                <div className="create-program-settings__logo-notice">
                  {t(
                    "manager.create-program-page.settings.fields.upload-logo-rules"
                  )}
                </div>
              </div>
              <div className="create-program-settings__item create-program-settings__item--wider create-program-settings__logo-section">
                <div className="create-program-settings__file-field-container">
                  <GVFormikField
                    name="logo"
                    component={InputImage}
                    defaultImage={ProgramDefaultImage}
                  />
                </div>
                <div className="create-program-settings__image-info">
                  <div className="create-program-settings__image-title">
                    {title}
                  </div>
                  <div className="create-program-settings__image-author">
                    {author}
                  </div>
                </div>
              </div>
              {broker.isSignalsAvailable && (
                <div className="create-program-settings__item">
                  <GVFormikField
                    type="checkbox"
                    color="primary"
                    name="isSignalProgram"
                    label={
                      <span>
                        {t(
                          "manager.create-program-page.settings.fields.provide-signals"
                        )}
                      </span>
                    }
                    component={GVCheckbox}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="create-program-settings__subheading">
            <span className="create-program-settings__block-number">02</span>
            {t("manager.create-program-page.settings.fees-settings")}
          </div>
          <div className="create-program-settings__fill-block create-program-settings__fill-block--with-border">
            <div className="create-program-settings__row">
              <div className="create-program-settings__row-title">
                {t(
                  "manager.create-program-page.settings.investment-program-fees"
                )}
              </div>
              <div className="create-program-settings__item">
                <GVFormikField
                  name="entryFee"
                  label={t(
                    "manager.create-program-page.settings.fields.entry-fee"
                  )}
                  adornment="%"
                  component={GVTextField}
                  InputComponent={NumberFormat}
                  autoComplete="off"
                  decimalScale={4}
                  isAllowed={allowValuesNumberFormat()}
                />
                <Hint
                  content={t(
                    "manager.create-program-page.settings.hints.entry-fee"
                  )}
                  className="create-program-settings__item-caption"
                  vertical={VERTICAL_POPOVER_POS.BOTTOM}
                  tooltipContent={t(
                    "manager.create-program-page.settings.hints.entry-fee-description"
                  )}
                />
              </div>
              <div className="create-program-settings__item">
                <GVFormikField
                  name="successFee"
                  label={t(
                    "manager.create-program-page.settings.fields.success-fee"
                  )}
                  adornment="%"
                  component={GVTextField}
                  InputComponent={NumberFormat}
                  autoComplete="off"
                  decimalScale={4}
                  isAllowed={allowValuesNumberFormat()}
                />
                <Hint
                  content={t(
                    "manager.create-program-page.settings.hints.success-fee"
                  )}
                  className="create-program-settings__item-caption"
                  vertical={VERTICAL_POPOVER_POS.BOTTOM}
                  tooltipContent={t(
                    "manager.create-program-page.settings.hints.success-fee-description"
                  )}
                />
              </div>
            </div>
            {isSignalProgram && (
              <SignalsFeeFormPartial
                subscriptionFeeFieldName="signalSubscriptionFee"
                successFeeFieldName="signalSuccessFee"
                maxEntryFee={100}
                maxSuccessFee={50}
              />
            )}
          </div>
          <div className="create-program-settings__subheading">
            <span className="create-program-settings__block-number">03</span>
            {t("manager.create-program-page.settings.deposit-details")}
          </div>
          <div
            className={"deposit-details create-program-settings__fill-block"}
          >
            <div className="create-program-settings__item deposit-details">
              <GVFormikField
                name="depositWalletId"
                component={GVTextField}
                label={t("transfer.from")}
                InputComponent={Select}
                onChange={this.onSelectChange(this.props.changeWallet)}
              >
                {wallets.map(wallet => {
                  return (
                    <option value={wallet.id} key={wallet.id}>
                      <img
                        src={filesService.getFileUrl(wallet.logo)}
                        className="transfer-popup__icon"
                        alt={wallet.currency}
                      />
                      {`${wallet.title} | ${wallet.currency}`}
                    </option>
                  );
                })}
              </GVFormikField>
              <InputAmountField
                autoFocus={false}
                name="depositAmount"
                label={t("transfer.amount")}
                currency={wallet.currency}
                isAllow={this.isAmountAllow(wallet.currency)}
                setMax={this.setMaxAmount(wallet.available, wallet.currency)}
              />
              {programCurrency !== wallet.currency && depositAmount && rate && (
                <div className="invest-popup__currency">
                  <NumberFormat
                    value={
                      programCurrency
                        ? formatCurrencyValue(
                            convertFromCurrency(depositAmount, rate),
                            programCurrency
                          )
                        : undefined
                    }
                    prefix="≈ "
                    suffix={` ${programCurrency}`}
                    displayType="text"
                  />
                </div>
              )}
              <div className="deposit-details__available-list">
                <div className="deposit-details__available-amount">
                  {t("manager.create-program-page.settings.fields.min-deposit")}
                  <span className={"deposit-details__available-amount-value"}>
                    <NumberFormat
                      value={
                        programCurrency
                          ? minimumDepositsAmount[programCurrency]
                          : undefined
                      }
                      thousandSeparator=" "
                      displayType="text"
                      suffix={` ${programCurrency}`}
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

          <div className="create-program-settings__navigation">
            <GVButton
              title={t("buttons.create-program")}
              color="primary"
              type="submit"
              disabled={isSubmitting}
            >
              {t("buttons.create-program")}
            </GVButton>
            <GVButton
              variant="text"
              onClick={navigateBack}
              className="create-program-settings__navigation-back"
            >
              <>&larr; {t("buttons.back")}</>
            </GVButton>
          </div>
        </form>
      </div>
    );
  }
}

export default compose<React.ComponentType<OwnProps>>(
  translate(),
  withFormik<ICreateProgramSettingsProps, ICreateProgramSettingsFormValues>({
    displayName: "CreateProgramSettingsForm",
    mapPropsToValues: ({
      wallet,
      broker,
      programCurrency,
      leverage,
      programsInfo,
      accountType
    }) => {
      const periodLength =
        programsInfo.periods.length === 1 ? programsInfo.periods[0] : undefined;
      return {
        stopOutLevel: 100,
        brokerAccountTypeId: accountType ? accountType.id : "",
        title: "",
        description: "",
        logo: {},
        entryFee: undefined,
        successFee: undefined,
        isSignalProgram: broker.isSignalsAvailable,
        signalSuccessFee: broker.isSignalsAvailable ? undefined : 0,
        signalSubscriptionFee: broker.isSignalsAvailable ? undefined : 0,
        currency: programCurrency,
        leverage: leverage,
        periodLength: periodLength,
        depositWalletId: wallet.id,
        depositAmount: undefined
      };
    },
    validationSchema: createProgramSettingsValidationSchema,
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  })
)(CreateProgramSettings);

interface OwnProps {
  broker: Broker;
  wallets: WalletData[];
  programsInfo: ProgramsInfo;
  onSubmit(data: ICreateProgramSettingsFormValues, setSubmitting: any): void;
  minimumDepositsAmount: { [key: string]: number };
  navigateBack(): void;
  author: string;
  notifyError(message: string): void;
  programCurrency?: string;
  changeCurrency(currency: string): void;
  leverage?: number;
  changeLeverage(leverage: number): void;
  accountType?: BrokerAccountType;
  changeAccountType(id: string): void;
  rate?: number;
  wallet: WalletData;
  changeWallet(id: string): void;
}

export interface ICreateProgramSettingsProps
  extends OwnProps,
    InjectedTranslateProps {}
export interface ICreateProgramSettingsFormValues {
  currency?: string;
  periodLength?: number;
  successFee?: number;
  stopOutLevel: number;
  leverage?: number;
  brokerAccountTypeId: string;
  signalSuccessFee?: number;
  signalSubscriptionFee?: number;
  isSignalProgram: boolean;
  title: string;
  description: string;
  logo: IImageValue;
  entryFee?: number;
  depositAmount?: number;
  depositWalletId: string;
}
