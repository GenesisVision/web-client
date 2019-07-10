import "shared/components/deposit-details/deposit-details.scss";

import "./create-program-settings.scss";

import { InjectedFormikProps, withFormik } from "formik";
import {
  Broker,
  BrokerAccountType,
  ProgramsInfo,
  WalletData,
  WalletDataCurrencyEnum
} from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import NumberFormat, { NumberFormatValues } from "react-number-format";
import { compose } from "redux";
import { IImageValue } from "shared/components/form/input-image/input-image";
import GVButton from "shared/components/gv-button";
import GVCheckbox from "shared/components/gv-checkbox/gv-checkbox";
import GVFormikField from "shared/components/gv-formik-field";
import GVTextField from "shared/components/gv-text-field";
import Hint from "shared/components/hint/hint";
import InputAmountField from "shared/components/input-amount-field/input-amount-field";
import { VERTICAL_POPOVER_POS } from "shared/components/popover/popover";
import Select from "shared/components/select/select";
import filesService from "shared/services/file-service";
import { convertFromCurrency } from "shared/utils/currency-converter";
import { formatCurrencyValue, validateFraction } from "shared/utils/formatter";
import { allowValuesNumberFormat } from "shared/utils/helpers";
import { CurrencyEnum } from "shared/utils/types";

import createProgramSettingsValidationSchema, {
  CREATE_PROGRAM_FIELDS
} from "./create-program-settings.validators";
import CreateProgramDescriptionField from "./fields/create-program-description-field";
import CreateProgramInvestmentLimitField from "./fields/create-program-investment-limit-field";
import CreateProgramLogoField from "./fields/create-program-logo-field";
import CreateProgramStopOutField from "./fields/create-program-stop-out-field";
import CreateProgramTitleField from "./fields/create-program-title-field";
import SignalsFeeFormPartial from "./signals-fee-form.partial";

class _CreateProgramSettings extends React.PureComponent<
  InjectedFormikProps<
    ICreateProgramSettingsProps,
    ICreateProgramSettingsFormValues
  >
> {
  componentDidUpdate(prevProps: ICreateProgramSettingsProps) {
    const { validateForm, setFieldValue } = this.props;
    if (prevProps.accountType !== this.props.accountType) {
      setFieldValue(
        CREATE_PROGRAM_FIELDS.brokerAccountTypeId,
        this.props.accountType!.id
      );
    }
    if (prevProps.programCurrency !== this.props.programCurrency) {
      setFieldValue(
        CREATE_PROGRAM_FIELDS.currency,
        this.props.programCurrency || ""
      );
    }
    if (prevProps.leverage !== this.props.leverage) {
      setFieldValue(CREATE_PROGRAM_FIELDS.leverage, this.props.leverage || "");
    }
    if (prevProps.wallet !== this.props.wallet) {
      setFieldValue(
        CREATE_PROGRAM_FIELDS.depositWalletId,
        this.props.wallet.id
      );
      setFieldValue(CREATE_PROGRAM_FIELDS.depositAmount, "");
    }
    if (prevProps.leverage !== this.props.leverage) {
      setFieldValue(CREATE_PROGRAM_FIELDS.leverage, this.props.leverage || "");
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
    setFieldValue(
      CREATE_PROGRAM_FIELDS.depositAmount,
      formatCurrencyValue(available, currency)
    );
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
      isSubmitting,
      values,
      programsInfo,
      accountType,
      rate,
      programCurrency,
      wallet
    } = this.props;
    const {
      currency,
      depositAmount,
      isSignalProgram,
      hasInvestmentLimit,
      description,
    } = values;
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
              <CreateProgramTitleField name={CREATE_PROGRAM_FIELDS.title} />
              <div className="create-program-settings__item">
                <GVFormikField
                  name={CREATE_PROGRAM_FIELDS.brokerAccountTypeId}
                  component={GVTextField}
                  label={t(
                    "manager.create-program-page.settings.fields.account-type"
                  )}
                  InputComponent={Select}
                  disableIfSingle
                  onChange={this.onSelectChange(this.props.changeAccountType)}
                >
                  {broker.accountTypes.map(accountType => (
                    <option value={accountType.id} key={accountType.id}>
                      {accountType.type}
                    </option>
                  ))}
                </GVFormikField>
              </div>
              <div className="create-program-settings__item">
                <GVFormikField
                  name={CREATE_PROGRAM_FIELDS.currency}
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
              <CreateProgramDescriptionField
                name={CREATE_PROGRAM_FIELDS.description}
                description={description}
              />
              <div className="create-program-settings__item">
                <GVFormikField
                  name={CREATE_PROGRAM_FIELDS.leverage}
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
                  name={CREATE_PROGRAM_FIELDS.periodLength}
                  component={GVTextField}
                  label={t(
                    "manager.create-program-page.settings.fields.period"
                  )}
                  InputComponent={Select}
                >
                  {programsInfo.periods.map(period => (
                    <option value={period} key={period}>
                      {`${period} ${t(
                        "manager.create-program-page.settings.fields.period-option-notation.day",
                        { count: period }
                      )}`}
                    </option>
                  ))}
                </GVFormikField>
              </div>
              <CreateProgramStopOutField
                name={CREATE_PROGRAM_FIELDS.stopOutLevel}
              />
              <CreateProgramInvestmentLimitField
                checkboxName={CREATE_PROGRAM_FIELDS.hasInvestmentLimit}
                inputName={CREATE_PROGRAM_FIELDS.investmentLimit}
                hasInvestmentLimit={hasInvestmentLimit}
                currency={currency}
                isAllow={this.isAmountAllow(currency as WalletDataCurrencyEnum)}
              />
              <CreateProgramLogoField
                name={CREATE_PROGRAM_FIELDS.logo}
                title={t(
                  "manager.create-program-page.settings.fields.upload-logo"
                )}
              />
              {broker.isSignalsAvailable && (
                <div className="create-program-settings__item">
                  <GVFormikField
                    type="checkbox"
                    color="primary"
                    name={CREATE_PROGRAM_FIELDS.isSignalProgram}
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
                  name={CREATE_PROGRAM_FIELDS.entryFee}
                  label={t(
                    "manager.create-program-page.settings.fields.entry-fee"
                  )}
                  adornment="%"
                  component={GVTextField}
                  type="number"
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
                  name={CREATE_PROGRAM_FIELDS.successFee}
                  label={t(
                    "manager.create-program-page.settings.fields.success-fee"
                  )}
                  adornment="%"
                  component={GVTextField}
                  type="number"
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
                volumeFeeFieldName={CREATE_PROGRAM_FIELDS.signalVolumeFee}
                successFeeFieldName={CREATE_PROGRAM_FIELDS.signalSuccessFee}
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
                name={CREATE_PROGRAM_FIELDS.depositWalletId}
                component={GVTextField}
                label={t("transfer.from")}
                InputComponent={Select}
                onChange={this.onSelectChange(this.props.changeWallet)}
              >
                {wallets.map(wallet => (
                  <option value={wallet.id} key={wallet.id}>
                    <img
                      src={filesService.getFileUrl(wallet.logo)}
                      className="transfer-popup__icon"
                      alt={wallet.currency}
                    />
                    {`${wallet.title} | ${wallet.currency}`}
                  </option>
                ))}
              </GVFormikField>
              <InputAmountField
                autoFocus={false}
                name={CREATE_PROGRAM_FIELDS.depositAmount}
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

const CreateProgramSettings = compose<React.ComponentType<OwnProps>>(
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
        [CREATE_PROGRAM_FIELDS.stopOutLevel]: 100,
        [CREATE_PROGRAM_FIELDS.brokerAccountTypeId]: accountType
          ? accountType.id
          : "",
        [CREATE_PROGRAM_FIELDS.title]: "",
        [CREATE_PROGRAM_FIELDS.description]: "",
        [CREATE_PROGRAM_FIELDS.logo]: {},
        [CREATE_PROGRAM_FIELDS.entryFee]: undefined,
        [CREATE_PROGRAM_FIELDS.successFee]: undefined,
        [CREATE_PROGRAM_FIELDS.hasInvestmentLimit]: false,
        [CREATE_PROGRAM_FIELDS.investmentLimit]: undefined,
        [CREATE_PROGRAM_FIELDS.isSignalProgram]: broker.isSignalsAvailable,
        [CREATE_PROGRAM_FIELDS.signalSuccessFee]: broker.isSignalsAvailable
          ? undefined
          : 0,
        [CREATE_PROGRAM_FIELDS.signalVolumeFee]: broker.isSignalsAvailable
          ? undefined
          : 0,
        [CREATE_PROGRAM_FIELDS.currency]: programCurrency,
        [CREATE_PROGRAM_FIELDS.leverage]: leverage,
        [CREATE_PROGRAM_FIELDS.periodLength]: periodLength,
        [CREATE_PROGRAM_FIELDS.depositWalletId]: wallet.id,
        [CREATE_PROGRAM_FIELDS.depositAmount]: undefined
      };
    },
    validationSchema: createProgramSettingsValidationSchema,
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  })
)(_CreateProgramSettings);
export default CreateProgramSettings;

interface OwnProps {
  broker: Broker;
  wallets: WalletData[];
  programsInfo: ProgramsInfo;
  onSubmit(data: ICreateProgramSettingsFormValues, setSubmitting: any): void;
  minimumDepositsAmount: { [key: string]: number };
  navigateBack(): void;
  author: string;
  notifyError(message: string): void;
  programCurrency: CurrencyEnum;
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
  [CREATE_PROGRAM_FIELDS.currency]: CurrencyEnum;
  [CREATE_PROGRAM_FIELDS.periodLength]?: number;
  [CREATE_PROGRAM_FIELDS.successFee]?: number;
  [CREATE_PROGRAM_FIELDS.stopOutLevel]: number;
  [CREATE_PROGRAM_FIELDS.leverage]?: number;
  [CREATE_PROGRAM_FIELDS.brokerAccountTypeId]: string;
  [CREATE_PROGRAM_FIELDS.signalSuccessFee]?: number;
  [CREATE_PROGRAM_FIELDS.signalVolumeFee]?: number;
  [CREATE_PROGRAM_FIELDS.isSignalProgram]: boolean;
  [CREATE_PROGRAM_FIELDS.hasInvestmentLimit]: boolean;
  [CREATE_PROGRAM_FIELDS.title]: string;
  [CREATE_PROGRAM_FIELDS.description]: string;
  [CREATE_PROGRAM_FIELDS.logo]: IImageValue;
  [CREATE_PROGRAM_FIELDS.entryFee]?: number;
  [CREATE_PROGRAM_FIELDS.depositAmount]?: number;
  [CREATE_PROGRAM_FIELDS.depositWalletId]: string;
  [CREATE_PROGRAM_FIELDS.investmentLimit]?: number;
}
