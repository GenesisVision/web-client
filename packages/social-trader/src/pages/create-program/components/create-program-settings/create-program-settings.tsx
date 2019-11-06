import "shared/components/deposit-details/deposit-details.scss";
import "./create-program-settings.scss";

import { CreateAssetFields } from "components/create-asset/create-asset-field/create-asset-field";
import useCreateAssetValidate from "components/create-asset/create-asset-validate.hook";
import DescriptionBlock from "components/create-asset/fields/description-block";
import FeesSettings from "components/create-asset/fields/fees-settings";
import InvestmentLimitField from "components/create-asset/fields/investment-limit-field";
import StopOutField from "components/create-asset/fields/stop-out-field";
import { InjectedFormikProps, withFormik } from "formik";
import {
  Broker,
  NewProgramRequestTradesDelayEnum,
  ProgramsInfo
} from "gv-api-web";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import { IImageValue } from "shared/components/form/input-image/input-image";
import SettingsBlock from "shared/components/settings-block/settings-block";
import { ASSET } from "shared/constants/constants";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";
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
  currency,
  programsInfo,
  t,
  isValid,
  handleSubmit,
  setFieldValue,
  minimumDepositsAmount,
  isSubmitting,
  values: { depositAmount, isSignalProgram, hasInvestmentLimit, description }
}) => {
  const validateAndSubmit = useCreateAssetValidate({ handleSubmit, isValid });
  return (
    <form onSubmit={validateAndSubmit}>
      <SettingsBlock
        label={t("create-program-page.settings.main-settings")}
        blockNumber={"01"}
      >
        <DescriptionBlock
          asset={ASSET.PROGRAM}
          titleName={CREATE_PROGRAM_FIELDS.title}
          descriptionName={CREATE_PROGRAM_FIELDS.description}
          logoName={CREATE_PROGRAM_FIELDS.logo}
          description={description}
        />
        <CreateAssetFields>
          <Currency
            name={CREATE_PROGRAM_FIELDS.currency}
            disabled={false}
            accountCurrencies={["GVT", "BTC", "ETH"]}
          />
          <PeriodLength
            programsInfo={programsInfo}
            name={CREATE_PROGRAM_FIELDS.periodLength}
          />
          <StopOutField name={CREATE_PROGRAM_FIELDS.stopOutLevel} />
          <TradesDelay name={CREATE_PROGRAM_FIELDS.tradesDelay} />
        </CreateAssetFields>
        <SignalProgram
          condition={true}
          name={CREATE_PROGRAM_FIELDS.isSignalProgram}
        />
      </SettingsBlock>
      <SettingsBlock
        label={t("create-program-page.settings.fees-settings")}
        blockNumber={"02"}
      >
        <FeesSettings
          title={t("create-program-page.settings.investment-program-fees")}
          entryFeeName={CREATE_PROGRAM_FIELDS.entryFee}
          entryFeeDescription={t(
            "create-program-page.settings.hints.entry-fee-description"
          )}
          secondFeeName={CREATE_PROGRAM_FIELDS.successFee}
          secondFeeLabel={t("create-program-page.settings.fields.success-fee")}
          secondFeeUnderText={t(
            "create-program-page.settings.hints.success-fee"
          )}
          secondFeeDescription={t(
            "create-program-page.settings.hints.success-fee-description"
          )}
        />
      </SettingsBlock>
      {isSignalProgram && (
        <SettingsBlock
          label={t("create-program-page.settings.signal-provider-fees")}
          blockNumber={"03"}
        >
          <SignalsFeeFormPartial
            volumeFeeFieldName={CREATE_PROGRAM_FIELDS.signalVolumeFee}
            successFeeFieldName={CREATE_PROGRAM_FIELDS.signalSuccessFee}
          />
        </SettingsBlock>
      )}
      <SettingsBlock
        label={t("create-program-page.settings.fields.investment-limit")}
        blockNumber={"04"}
      >
        <InvestmentLimitField
          checkboxName={CREATE_PROGRAM_FIELDS.hasInvestmentLimit}
          inputName={CREATE_PROGRAM_FIELDS.investmentLimit}
          hasInvestmentLimit={hasInvestmentLimit}
          currency={currency as CurrencyEnum}
        />
      </SettingsBlock>
      <DepositDetailsBlock
        blockNumber={5}
        availableName={CREATE_PROGRAM_FIELDS.available}
        rateName={CREATE_PROGRAM_FIELDS.rate}
        walletFieldName={CREATE_PROGRAM_FIELDS.depositWalletId}
        inputName={CREATE_PROGRAM_FIELDS.depositAmount}
        depositAmount={depositAmount}
        minimumDepositAmount={minimumDepositsAmount[currency]}
        setFieldValue={setFieldValue}
        assetCurrency={currency}
      />
      <CreateAssetNavigation
        asset={ASSET.PROGRAM}
        isSubmitting={isSubmitting}
      />
    </form>
  );
};

interface OwnProps {
  currency: CurrencyEnum;
  programsInfo: ProgramsInfo;
  onSubmit: (
    data: ICreateProgramSettingsFormValues,
    setSubmitting: SetSubmittingType
  ) => void;
  minimumDepositsAmount: { [key: string]: number };
}

export interface ICreateProgramSettingsProps
  extends OwnProps,
    WithTranslation {}

export interface ICreateProgramSettingsFormValues {
  [CREATE_PROGRAM_FIELDS.currency]: string;
  [CREATE_PROGRAM_FIELDS.available]: number;
  [CREATE_PROGRAM_FIELDS.rate]: number;
  [CREATE_PROGRAM_FIELDS.tradesDelay]: NewProgramRequestTradesDelayEnum;
  [CREATE_PROGRAM_FIELDS.periodLength]?: number;
  [CREATE_PROGRAM_FIELDS.successFee]?: number;
  [CREATE_PROGRAM_FIELDS.stopOutLevel]: number;
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
  ICreateProgramSettingsProps,
  ICreateProgramSettingsFormValues
>;

const CreateProgramSettings = compose<
  React.ComponentType<OwnProps & WithLoaderProps>
>(
  withLoader,
  translate(),
  withFormik<ICreateProgramSettingsProps, ICreateProgramSettingsFormValues>({
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
