import "shared/components/deposit-details/deposit-details.scss";

import "./create-program-settings.scss";

import CreateAssetSection from "components/create-asset/create-asset-section/create-asset-section";
import DescriptionBlock from "components/create-asset/fields/description-block";
import FeesSettings from "components/create-asset/fields/fees-settings";
import InvestmentLimitField from "components/create-asset/fields/investment-limit-field";
import StopOutField from "components/create-asset/fields/stop-out-field";
import { InjectedFormikProps, withFormik } from "formik";
import { Broker, BrokerAccountType, NewProgramRequestTradesDelayEnum, ProgramsInfo, WalletData } from "gv-api-web";
import * as React from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { compose } from "redux";
import { IImageValue } from "shared/components/form/input-image/input-image";
import { ASSET } from "shared/constants/constants";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
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

const _CreateProgramSettings: React.FC<Props> = ({
  leverage,
  validateForm,
  isValid,
  handleSubmit,
  changeAccountType,
  changeWallet,
  changeCurrency,
  changeLeverage,
  setFieldValue,
  minimumDepositsAmount,
  wallets,
  navigateBack,
  broker,
  isSubmitting,
  values: {
    currency,
    depositAmount,
    isSignalProgram,
    hasInvestmentLimit,
    description
  },
  programsInfo,
  accountType,
  rate,
  programCurrency,
  wallet
}) => {
  console.log(programsInfo);
  const dispatch = useDispatch();
  const [t] = useTranslation();
  useEffect(
    () => {
      setFieldValue(CREATE_PROGRAM_FIELDS.brokerAccountTypeId, accountType!.id);
    },
    [accountType]
  );
  useEffect(
    () => {
      setFieldValue(CREATE_PROGRAM_FIELDS.currency, programCurrency || "");
    },
    [programCurrency]
  );
  useEffect(
    () => {
      setFieldValue(CREATE_PROGRAM_FIELDS.leverage, leverage);
    },
    [leverage]
  );
  useEffect(
    () => {
      setFieldValue(CREATE_PROGRAM_FIELDS.depositWalletId, wallet.id);
      setFieldValue(CREATE_PROGRAM_FIELDS.depositAmount, "");
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
    <div className="create-program-settings">
      <form onSubmit={validateAndSubmit}>
        <CreateAssetSection
          title={t("manager.create-program-page.settings.main-settings")}
          blockNumber={"01"}
        >
          <DescriptionBlock
            asset={ASSET.PROGRAM}
            titleName={CREATE_PROGRAM_FIELDS.title}
            descriptionName={CREATE_PROGRAM_FIELDS.description}
            logoName={CREATE_PROGRAM_FIELDS.logo}
            description={description}
          />
          <BrokerAccount
            name={CREATE_PROGRAM_FIELDS.brokerAccountTypeId}
            onChange={changeAccountType}
            accountTypes={broker.accountTypes}
          />
          <Currency
            name={CREATE_PROGRAM_FIELDS.currency}
            onChange={changeCurrency}
            disabled={accountType === undefined}
            accountCurrencies={accountType.currencies as CurrencyEnum[]}
          />
          <Leverage
            name={CREATE_PROGRAM_FIELDS.leverage}
            onChange={changeLeverage}
            disabled={!accountType}
            accountLeverages={accountType.leverages}
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
          />
          <SignalProgram
            condition={broker.isSignalsAvailable}
            name={CREATE_PROGRAM_FIELDS.isSignalProgram}
          />
        </CreateAssetSection>
        <CreateAssetSection
          title={t("manager.create-program-page.settings.fees-settings")}
          blockNumber={"02"}
        >
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
        </CreateAssetSection>
        <DepositDetailsBlock
          walletFieldName={CREATE_PROGRAM_FIELDS.depositWalletId}
          inputName={CREATE_PROGRAM_FIELDS.depositAmount}
          depositAmount={depositAmount}
          minimumDepositAmount={minimumDepositsAmount[programCurrency]}
          wallets={wallets}
          rate={rate}
          setFieldValue={setFieldValue}
          onWalletChange={changeWallet}
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
};

export interface ICreateProgramSettingsOwnProps {
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
  programCurrency: CurrencyEnum;
  changeCurrency: (currency: CurrencyEnum) => void;
  leverage: number;
  changeLeverage: (leverage: number) => void;
  accountType: BrokerAccountType;
  changeAccountType: (id: string) => void;
  rate: number;
  wallet: WalletData;
  changeWallet: (id: string) => void;
}

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

type Props = InjectedFormikProps<
  ICreateProgramSettingsOwnProps,
  ICreateProgramSettingsFormValues
>;

const CreateProgramSettings = compose<
  React.ComponentType<ICreateProgramSettingsOwnProps>
>(
  withFormik<ICreateProgramSettingsOwnProps, ICreateProgramSettingsFormValues>({
    displayName: "CreateProgramSettingsForm",
    mapPropsToValues: createProgramMapPropsToValues,
    validationSchema: createProgramSettingsValidationSchema,
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  }),
  React.memo
)(_CreateProgramSettings);
export default CreateProgramSettings;
