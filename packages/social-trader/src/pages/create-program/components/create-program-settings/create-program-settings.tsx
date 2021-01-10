import {
  getBrokerId,
  getCurrency,
  getLeverage
} from "components/assets/asset.helpers";
import useAssetValidate from "components/assets/asset-validate.hook";
import { BrokerCardType } from "components/assets/broker-select/broker-select.types";
import BrokerAccount from "components/assets/fields/broker-account";
import CreateAssetNavigation from "components/assets/fields/create-asset-navigation";
import CreateProgramDepositBlock from "components/assets/fields/create-program-deposit-block";
import Currency from "components/assets/fields/currency";
import DescriptionBlock from "components/assets/fields/description-block";
import FeesSettings from "components/assets/fields/fees-settings";
import InvestmentLimitField from "components/assets/fields/investment-limit-field";
import Leverage from "components/assets/fields/leverage";
import PeriodLength from "components/assets/fields/period-length";
import Processing from "components/assets/fields/processing";
import StopOutField from "components/assets/fields/stop-out-field";
import TradesDelay from "components/assets/fields/trades-delay";
import { IImageValue } from "components/form/input-image/input-image";
import { Row } from "components/row/row";
import { RowItem } from "components/row-item/row-item";
import SettingsBlock from "components/settings-block/settings-block";
import { ASSET } from "constants/constants";
import {
  BrokerAccountType,
  ProgramAssetPlatformInfo,
  ProgramMinInvestAmount
} from "gv-api-web";
import { CONVERT_ASSET_FIELDS } from "pages/convert-asset/components/convert-asset-settings.helpers";
import { KycRequiredBlock } from "pages/create-account/components/create-account-settings/kyc-required-block";
import * as React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { kycConfirmedSelector } from "reducers/header-reducer";
import { safeGetElemFromArray } from "utils/helpers";
import { HookForm } from "utils/hook-form.helpers";
import { CurrencyEnum } from "utils/types";
import {
  convertShapeToRules,
  entryFeeShape,
  successFeeShape
} from "utils/validators/validators";

export enum CREATE_PROGRAM_FIELDS {
  hourProcessing = "hourProcessing",
  isProcessingRealTime = "isProcessingRealTime",
  title = "title",
  description = "description",
  logo = "logo",
  periodLength = "periodLength",
  stopOutLevel = "stopOutLevel",
  investmentLimit = "investmentLimit",
  tradesDelay = "tradesDelay",
  managementFee = "managementFee",
  entryFee = "entryFee",
  successFee = "successFee",
  depositWalletId = "depositWalletId",
  depositAmount = "depositAmount",
  currency = "currency",
  leverage = "leverage",
  brokerAccountTypeId = "brokerAccountTypeId"
}

export interface ICreateProgramSettingsFormValues {
  [CREATE_PROGRAM_FIELDS.hourProcessing]?: number;
  [CREATE_PROGRAM_FIELDS.isProcessingRealTime]?: boolean;
  [CREATE_PROGRAM_FIELDS.title]: string;
  [CREATE_PROGRAM_FIELDS.description]: string;
  [CREATE_PROGRAM_FIELDS.logo]: IImageValue;
  [CREATE_PROGRAM_FIELDS.periodLength]?: number;
  [CREATE_PROGRAM_FIELDS.stopOutLevel]: number;
  [CREATE_PROGRAM_FIELDS.investmentLimit]: number;
  [CREATE_PROGRAM_FIELDS.tradesDelay]: string;
  [CREATE_PROGRAM_FIELDS.entryFee]?: number;
  [CREATE_PROGRAM_FIELDS.successFee]?: number;
  [CREATE_PROGRAM_FIELDS.brokerAccountTypeId]: string;
  [CREATE_PROGRAM_FIELDS.leverage]: number;
  [CREATE_PROGRAM_FIELDS.currency]: string;
  [CREATE_PROGRAM_FIELDS.depositWalletId]: string;
  [CREATE_PROGRAM_FIELDS.depositAmount]?: number | string;
}

interface Props {
  programsInfo: ProgramAssetPlatformInfo;
  errorMessage?: string;
  broker: BrokerCardType;
  onSubmit: (values: ICreateProgramSettingsFormValues) => void;
}

const _CreateProgramSettings: React.FC<Props> = ({
  programsInfo: {
    minInvestAmounts,
    periods,
    createProgramInfo: { maxManagementFee, maxSuccessFee }
  },
  errorMessage,
  broker,
  onSubmit
}) => {
  const isExchange = !("leverageMin" in broker);

  const [hasInvestmentLimit, setHasInvestmentLimit] = useState(false);
  const [t] = useTranslation();

  const form = useForm<ICreateProgramSettingsFormValues>({
    defaultValues: {
      [CREATE_PROGRAM_FIELDS.tradesDelay]: "None",
      [CREATE_PROGRAM_FIELDS.stopOutLevel]: 100,
      [CREATE_PROGRAM_FIELDS.periodLength]:
        periods.length === 1 ? periods[0] : undefined,
      [CREATE_PROGRAM_FIELDS.brokerAccountTypeId]: getBrokerId(
        broker.accountTypes
      ),
      [CREATE_PROGRAM_FIELDS.currency]: getCurrency(broker.accountTypes[0]),
      [CREATE_PROGRAM_FIELDS.leverage]: getLeverage(broker.accountTypes[0]),
      [CREATE_PROGRAM_FIELDS.depositWalletId]: "",
      [CREATE_PROGRAM_FIELDS.depositAmount]: undefined
    },
    mode: "onChange"
  });

  const {
    triggerValidation,
    watch,
    setValue,
    formState: { isValid }
  } = form;

  const {
    isProcessingRealTime,
    description,
    brokerAccountTypeId,
    depositAmount,
    currency
  } = watch();

  useEffect(() => {
    triggerValidation();
  }, [hasInvestmentLimit]);

  const accountType = safeGetElemFromArray(
    (broker.accountTypes as unknown) as BrokerAccountType[],
    ({ id }) => brokerAccountTypeId === id
  );

  const isKycConfirmed = useSelector(kycConfirmedSelector);
  const kycRequired = !isKycConfirmed && accountType.isKycRequired;

  const minDepositCreateAssetArray = safeGetElemFromArray<ProgramMinInvestAmount>(
    minInvestAmounts,
    ({ serverType }) => serverType === accountType.type
  ).minDepositCreateAsset;

  const validateAndSubmit = useAssetValidate({
    handleSubmit: onSubmit,
    isValid
  });

  return (
    <HookForm form={form} onSubmit={validateAndSubmit}>
      <SettingsBlock
        label={t("create-account:settings.main-settings")}
        blockNumber={"01"}
      >
        <div>
          <DescriptionBlock
            asset={ASSET.PROGRAM}
            titleName={CREATE_PROGRAM_FIELDS.title}
            descriptionName={CREATE_PROGRAM_FIELDS.description}
            logoName={CREATE_PROGRAM_FIELDS.logo}
            description={description}
          />
          <Row onlyOffset size={"xlarge"}>
            {isExchange && (
              <Row onlyOffset>
                <Row>
                  <h4>{t("asset-settings:fields.processing")}</h4>
                </Row>
                <Row>
                  <Processing
                    realtimeValue={isProcessingRealTime}
                    checkboxName={CONVERT_ASSET_FIELDS.isProcessingRealTime}
                    selectName={CONVERT_ASSET_FIELDS.hourProcessing}
                  />
                </Row>
              </Row>
            )}
            <Row>
              {!isExchange && (
                <RowItem>
                  <BrokerAccount
                    setAccountType={(value: string) =>
                      setValue(CREATE_PROGRAM_FIELDS.brokerAccountTypeId, value)
                    }
                    setLeverage={(value: number) =>
                      setValue(CREATE_PROGRAM_FIELDS.leverage, value)
                    }
                    setCurrency={(value: string) =>
                      setValue(CREATE_PROGRAM_FIELDS.currency, value)
                    }
                    name={CREATE_PROGRAM_FIELDS.brokerAccountTypeId}
                    accountTypes={
                      (broker.accountTypes as unknown) as BrokerAccountType[]
                    }
                  />
                </RowItem>
              )}
              <RowItem>
                <Currency
                  name={CREATE_PROGRAM_FIELDS.currency}
                  disabled={accountType === undefined}
                  accountCurrencies={accountType.currencies as CurrencyEnum[]}
                />
              </RowItem>
            </Row>
            {!isExchange && (
              <Row>
                <RowItem>
                  <Leverage
                    name={CREATE_PROGRAM_FIELDS.leverage}
                    accountLeverages={
                      isExchange
                        ? []
                        : (accountType as BrokerAccountType).leverages
                    }
                  />
                </RowItem>
                <RowItem>
                  <PeriodLength
                    periods={periods}
                    name={CREATE_PROGRAM_FIELDS.periodLength}
                  />
                </RowItem>
              </Row>
            )}
            <Row>
              {!isExchange && (
                <RowItem>
                  <StopOutField name={CREATE_PROGRAM_FIELDS.stopOutLevel} />
                </RowItem>
              )}
              <RowItem>
                <TradesDelay name={CREATE_PROGRAM_FIELDS.tradesDelay} />
              </RowItem>
            </Row>
          </Row>
        </div>
      </SettingsBlock>
      <SettingsBlock
        label={t("create-account:settings.fees-settings")}
        blockNumber={"02"}
      >
        <FeesSettings
          title={t("create-account:settings.investment-program-fees")}
          firstFeeLabel={t("asset-settings:fields.management-fee")}
          firstFeeUnderText={t("create-account:settings.hints.management-fee")}
          firstFeeName={
            isExchange
              ? CREATE_PROGRAM_FIELDS.managementFee
              : CREATE_PROGRAM_FIELDS.entryFee
          }
          firstFeeDescription={t(
            "create-account:settings.hints.management-fee-description"
          )}
          firstFeeRules={convertShapeToRules(
            entryFeeShape(t, maxManagementFee)
          )}
          secondFeeName={CREATE_PROGRAM_FIELDS.successFee}
          secondFeeLabel={t("asset-settings:fields.success-fee")}
          secondFeeUnderText={t("create-account:settings.hints.success-fee")}
          secondFeeDescription={t(
            "create-account:settings.hints.success-fee-description"
          )}
          secondFeeRules={convertShapeToRules(
            successFeeShape(t, maxSuccessFee)
          )}
        />
      </SettingsBlock>
      <SettingsBlock
        label={t("asset-settings:fields.investment-limit")}
        blockNumber={"03"}
      >
        <InvestmentLimitField
          wide={false}
          setHasInvestmentLimit={setHasInvestmentLimit}
          checkboxName={"hasInvestmentLimit"}
          inputName={CREATE_PROGRAM_FIELDS.investmentLimit}
          hasInvestmentLimit={hasInvestmentLimit}
          currency={currency as CurrencyEnum}
        />
      </SettingsBlock>
      {kycRequired ? (
        <KycRequiredBlock />
      ) : (
        <>
          {accountType.isDepositRequired && (
            <CreateProgramDepositBlock
              blockNumber={4}
              walletFieldName={CREATE_PROGRAM_FIELDS.depositWalletId}
              inputName={CREATE_PROGRAM_FIELDS.depositAmount}
              depositAmount={depositAmount}
              minimumDepositAmounts={minDepositCreateAssetArray}
              setFieldValue={setValue}
              assetCurrency={currency as CurrencyEnum}
            />
          )}
          <Row size={"large"}>
            <CreateAssetNavigation
              asset={ASSET.PROGRAM}
              isSuccessful={!errorMessage}
            />
          </Row>
        </>
      )}
    </HookForm>
  );
};

const CreateProgramSettings = React.memo(_CreateProgramSettings);
export default CreateProgramSettings;
