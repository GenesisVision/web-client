import "shared/components/deposit-details/deposit-details.scss";

import "./create-program-settings.scss";

import { InjectedFormikProps, withFormik } from "formik";
import {
  Broker,
  BrokerAccountType,
  NewProgramRequestTradesDelayEnum,
  ProgramsInfo,
  WalletData,
  WalletDataCurrencyEnum
} from "gv-api-web";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { NumberFormatValues } from "react-number-format";
import { compose } from "redux";
import DescriptionBlock from "shared/components/fields/description-block";
import FeesSettings from "shared/components/fields/fees-settings";
import InvestmentLimitField from "shared/components/fields/investment-limit-field";
import StopOutField from "shared/components/fields/stop-out-field";
import { IImageValue } from "shared/components/form/input-image/input-image";
import { ISelectChangeEvent } from "shared/components/select/select";
import { ASSET } from "shared/constants/constants";
import { validateFraction } from "shared/utils/formatter";
import { CurrencyEnum, SetSubmittingType } from "shared/utils/types";

import createProgramSettingsValidationSchema, {
  CREATE_PROGRAM_FIELDS,
  createProgramMapPropsToValues
} from "./create-program-settings.helpers";
import BrokerAccount from "./fields/broker-account";
import CreateAssetNavigation from "./fields/create-asset-navigation";
import Currency from "./fields/currency";
import DepositDetailsBlock from "./fields/deposit-details-block";
import Leverage from "./fields/leverage";
import PeriodLength from "./fields/period-length";
import SignalProgram from "./fields/signal-program";
import TradesDelay from "./fields/trades-delay";
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

  onSelectChange = (onChangeFn: (value: any) => void) => (
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
        <form onSubmit={this.validateAndSubmit}>
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
              <BrokerAccount
                name={CREATE_PROGRAM_FIELDS.brokerAccountTypeId}
                onChange={this.onSelectChange(this.props.changeAccountType)}
                accountTypes={broker.accountTypes}
              />
              <Currency
                name={CREATE_PROGRAM_FIELDS.currency}
                onChange={this.onSelectChange(this.props.changeCurrency)}
                disabled={accountType === undefined}
                accountCurrencies={accountCurrencies as CurrencyEnum[]}
              />
              <Leverage
                name={CREATE_PROGRAM_FIELDS.leverage}
                onChange={this.onSelectChange(this.props.changeLeverage)}
                disabled={!accountType}
                accountLeverages={accountLeverages}
              />
              <PeriodLength
                name={CREATE_PROGRAM_FIELDS.brokerAccountTypeId}
                programsInfo={programsInfo}
              />
              <StopOutField name={CREATE_PROGRAM_FIELDS.stopOutLevel} />
              <TradesDelay name={CREATE_PROGRAM_FIELDS.tradesDelay} />
              <InvestmentLimitField
                checkboxName={CREATE_PROGRAM_FIELDS.hasInvestmentLimit}
                inputName={CREATE_PROGRAM_FIELDS.investmentLimit}
                hasInvestmentLimit={hasInvestmentLimit}
                currency={currency}
                isAllow={this.isAmountAllow(currency as WalletDataCurrencyEnum)}
              />
              <SignalProgram
                condition={broker.isSignalsAvailable}
                name={CREATE_PROGRAM_FIELDS.isSignalProgram}
              />
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
    mapPropsToValues: createProgramMapPropsToValues,
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
  onSubmit: (
    data: ICreateProgramSettingsFormValues,
    setSubmitting: SetSubmittingType
  ) => void;
  minimumDepositsAmount: { [key: string]: number };
  navigateBack: () => void;
  author: string;
  notifyError: (message: string) => void;
  programCurrency: CurrencyEnum;
  changeCurrency: (currency: CurrencyEnum) => void;
  leverage?: number;
  changeLeverage: (leverage: number) => void;
  accountType?: BrokerAccountType;
  changeAccountType: (id: string) => void;
  rate: number;
  wallet: WalletData;
  changeWallet: (id: string) => void;
}

export interface ICreateProgramSettingsProps
  extends OwnProps,
    WithTranslation {}
export interface ICreateProgramSettingsFormValues {
  [CREATE_PROGRAM_FIELDS.tradesDelay]: NewProgramRequestTradesDelayEnum;
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
