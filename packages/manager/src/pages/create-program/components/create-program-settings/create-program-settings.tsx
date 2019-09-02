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
import DescriptionBlock from "modules/asset-settings/fields/description-block";
import FeesSettings from "modules/asset-settings/fields/fees-settings";
import InvestmentLimitField from "modules/asset-settings/fields/investment-limit-field";
import StopOutField from "modules/asset-settings/fields/stop-out-field";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { NumberFormatValues } from "react-number-format";
import { compose } from "redux";
import { IImageValue } from "shared/components/form/input-image/input-image";
import GVCheckbox from "shared/components/gv-checkbox/gv-checkbox";
import GVFormikField from "shared/components/gv-formik-field";
import GVTextField from "shared/components/gv-text-field";
import Select, { ISelectChangeEvent } from "shared/components/select/select";
import { ASSET } from "shared/constants/constants";
import { validateFraction } from "shared/utils/formatter";
import { CurrencyEnum } from "shared/utils/types";

import createProgramSettingsValidationSchema, {
  CREATE_PROGRAM_FIELDS
} from "./create-program-settings.validators";
import CreateAssetNavigation from "./fields/create-asset-navigation";
import DepositDetailsBlock from "./fields/deposit-details-block";
import SignalsFeeFormPartial from "./signals-fee-form.partial";

class _CreateProgramSettings extends React.PureComponent<
  InjectedFormikProps<
    ICreateProgramSettingsProps,
    ICreateProgramSettingsFormValues
  >
> {
  componentDidUpdate(prevProps: ICreateProgramSettingsProps) {
    const {
      validateForm,
      setFieldValue,
      accountType,
      programCurrency,
      leverage,
      rate,
      wallet
    } = this.props;
    if (prevProps.accountType !== accountType) {
      setFieldValue(CREATE_PROGRAM_FIELDS.brokerAccountTypeId, accountType!.id);
    }
    if (prevProps.programCurrency !== programCurrency) {
      setFieldValue(CREATE_PROGRAM_FIELDS.currency, programCurrency || "");
    }
    if (prevProps.leverage !== leverage) {
      setFieldValue(CREATE_PROGRAM_FIELDS.leverage, leverage || "");
    }
    if (prevProps.wallet !== wallet) {
      setFieldValue(CREATE_PROGRAM_FIELDS.depositWalletId, wallet.id);
      setFieldValue(CREATE_PROGRAM_FIELDS.depositAmount, "");
    }
    if (prevProps.leverage !== leverage) {
      setFieldValue(CREATE_PROGRAM_FIELDS.leverage, leverage || "");
    }
    if (prevProps.rate !== rate) {
      validateForm();
    }
  }

  onSelectChange = (onChangeFn: (value: string & number) => void) => (
    _: ISelectChangeEvent,
    target: JSX.Element
  ) => {
    onChangeFn(target.props.value);
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
      setFieldValue,
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
      description
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
              <DescriptionBlock
                asset={ASSET.PROGRAM}
                titleName={CREATE_PROGRAM_FIELDS.title}
                descriptionName={CREATE_PROGRAM_FIELDS.description}
                logoName={CREATE_PROGRAM_FIELDS.logo}
                description={description}
              />
              <div className="create-program-settings__field">
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
              <div className="create-program-settings__field">
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
              <div className="create-program-settings__field">
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
              <div className="create-program-settings__field">
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
              <StopOutField name={CREATE_PROGRAM_FIELDS.stopOutLevel} />
              <InvestmentLimitField
                checkboxName={CREATE_PROGRAM_FIELDS.hasInvestmentLimit}
                inputName={CREATE_PROGRAM_FIELDS.investmentLimit}
                hasInvestmentLimit={hasInvestmentLimit}
                currency={currency}
                isAllow={this.isAmountAllow(currency as WalletDataCurrencyEnum)}
              />
              {broker.isSignalsAvailable && (
                <div className="create-program-settings__field create-program-settings__field--wider">
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
            <FeesSettings
              title={t(
                "manager.create-program-page.settings.investment-program-fees"
              )}
              entryFeeName={CREATE_PROGRAM_FIELDS.entryFee}
              entryFeeDescription={t(
                "manager.create-program-page.settings.hints.entry-fee-description"
              )}
              secondFeeName={CREATE_PROGRAM_FIELDS.successFee}
              secondFeeLabel={t(
                "manager.create-program-page.settings.fields.success-fee"
              )}
              secondFeeUnderText={t(
                "manager.create-program-page.settings.hints.success-fee"
              )}
              secondFeeDescription={t(
                "manager.create-program-page.settings.hints.success-fee-description"
              )}
            />
            {isSignalProgram && (
              <SignalsFeeFormPartial
                volumeFeeFieldName={CREATE_PROGRAM_FIELDS.signalVolumeFee}
                successFeeFieldName={CREATE_PROGRAM_FIELDS.signalSuccessFee}
              />
            )}
          </div>
          <DepositDetailsBlock
            walletFieldName={CREATE_PROGRAM_FIELDS.depositWalletId}
            inputName={CREATE_PROGRAM_FIELDS.depositAmount}
            depositAmount={depositAmount}
            minimumDepositAmount={minimumDepositsAmount[programCurrency]}
            wallets={wallets}
            rate={rate}
            setFieldValue={setFieldValue}
            onWalletChange={this.onSelectChange(this.props.changeWallet)}
            assetCurrency={programCurrency}
            walletAvailable={wallet.available}
            walletCurrency={wallet.currency}
          />
          <CreateAssetNavigation
            asset={ASSET.PROGRAM}
            navigateBack={navigateBack}
            isSubmitting={isSubmitting}
          />
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
  rate: number;
  wallet: WalletData;
  changeWallet(id: string): void;
}

export interface ICreateProgramSettingsProps
  extends OwnProps,
    WithTranslation {}
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
