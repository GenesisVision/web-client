import { AssetFields } from "components/assets/asset-fields/asset-field";
import CreateAssetNavigation from "components/assets/fields/create-asset-navigation";
import Currency from "components/assets/fields/currency";
import DescriptionBlock from "components/assets/fields/description-block";
import FeesSettings from "components/assets/fields/fees-settings";
import InvestmentLimitField from "components/assets/fields/investment-limit-field";
import PeriodLength from "components/assets/fields/period-length";
import Processing from "components/assets/fields/processing";
import SignalsFeeFormPartial from "components/assets/fields/signals-fee-form.partial";
import StopOutField from "components/assets/fields/stop-out-field";
import TradesDelay from "components/assets/fields/trades-delay";
import { IImageValue } from "components/form/input-image/input-image";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import SettingsBlock from "components/settings-block/settings-block";
import { ASSET } from "constants/constants";
import withLoader from "decorators/with-loader";
import {
  FollowCreateAssetPlatformInfo,
  ProgramAssetPlatformInfo,
  TradesDelay as TradesDelayType
} from "gv-api-web";
import { CONVERT_ASSET } from "pages/convert-asset/convert-asset.contants";
import { TAssetFromTo } from "pages/convert-asset/convert-asset.types";
import * as React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { HookForm } from "utils/hook-form.helpers";
import { CurrencyEnum } from "utils/types";

import convertAssetSettingsValidationSchema, {
  CONVERT_ASSET_FIELDS
} from "./convert-asset-settings.helpers";

export interface IConvertAssetSettingsFormOwnProps {
  currency?: CurrencyEnum;
  id: string;
  broker?: string;
  fromTo: TAssetFromTo;
}

export interface IConvertAssetSettingsProps
  extends IConvertAssetSettingsFormOwnProps {
  errorMessage?: string;
  followInfo: FollowCreateAssetPlatformInfo;
  programsInfo: ProgramAssetPlatformInfo;
  onSubmit: (data: IConvertAssetSettingsFormValues) => void;
}

export interface IConvertAssetSettingsFormValues {
  [CONVERT_ASSET_FIELDS.hourProcessing]?: number;
  [CONVERT_ASSET_FIELDS.isProcessingRealTime]?: boolean;
  [CONVERT_ASSET_FIELDS.currency]: string;
  [CONVERT_ASSET_FIELDS.tradesDelay]: TradesDelayType;
  [CONVERT_ASSET_FIELDS.periodLength]?: number;
  [CONVERT_ASSET_FIELDS.successFee]?: number;
  [CONVERT_ASSET_FIELDS.stopOutLevel]: number;
  [CONVERT_ASSET_FIELDS.successFee]?: number;
  [CONVERT_ASSET_FIELDS.volumeFee]?: number;
  [CONVERT_ASSET_FIELDS.title]: string;
  [CONVERT_ASSET_FIELDS.description]: string;
  [CONVERT_ASSET_FIELDS.logo]: IImageValue;
  [CONVERT_ASSET_FIELDS.entryFee]?: number;
  [CONVERT_ASSET_FIELDS.investmentLimit]?: number;
}

const _ConvertAssetSettings: React.FC<IConvertAssetSettingsProps> = props => {
  const [isSignalProgram] = useState(true);
  const [hasInvestmentLimit, setHasInvestmentLimit] = useState(false);
  const {
    currency: currencyProp,
    onSubmit,
    broker,
    fromTo: { assetTo, assetFrom },
    programsInfo: { periods },
    errorMessage
  } = props;
  const [t] = useTranslation();

  const form = useForm<IConvertAssetSettingsFormValues>({
    defaultValues: {
      [CONVERT_ASSET_FIELDS.hourProcessing]: 0,
      [CONVERT_ASSET_FIELDS.tradesDelay]: "None",
      [CONVERT_ASSET_FIELDS.stopOutLevel]: 100,
      [CONVERT_ASSET_FIELDS.currency]: currencyProp || "GVT",
      [CONVERT_ASSET_FIELDS.periodLength]:
        periods.length === 1 ? periods[0] : undefined
    },
    validationSchema: convertAssetSettingsValidationSchema({
      ...props,
      t,
      hasInvestmentLimit,
      isSignalProgram
    }),
    mode: "onChange"
  });
  const { watch, triggerValidation } = form;
  const { description, currency, isProcessingRealTime } = watch();

  useEffect(() => {
    triggerValidation();
  }, [hasInvestmentLimit]);

  const showDescriptionBlock = assetFrom !== CONVERT_ASSET.SIGNAL;
  const showSignalFees = assetTo === CONVERT_ASSET.SIGNAL;
  const showProgramFields = assetTo === CONVERT_ASSET.PROGRAM;
  const showCurrency = broker === "Huobi";

  return (
    <HookForm form={form} onSubmit={onSubmit}>
      <SettingsBlock
        label={t("create-account:settings.main-settings")}
        blockNumber={"01"}
      >
        {showDescriptionBlock && (
          <DescriptionBlock
            asset={ASSET.PROGRAM}
            titleName={CONVERT_ASSET_FIELDS.title}
            descriptionName={CONVERT_ASSET_FIELDS.description}
            logoName={CONVERT_ASSET_FIELDS.logo}
            description={description}
          />
        )}
        {showProgramFields && (
          <Row onlyOffset size={"large"}>
            {assetFrom === CONVERT_ASSET.EXCHANGE_ACCOUNT && (
              <Row>
                <Processing
                  realtimeValue={isProcessingRealTime}
                  checkboxName={CONVERT_ASSET_FIELDS.isProcessingRealTime}
                  selectName={CONVERT_ASSET_FIELDS.hourProcessing}
                />
              </Row>
            )}
            <Row>
              <AssetFields>
                <Currency
                  hide={!showCurrency}
                  name={CONVERT_ASSET_FIELDS.currency}
                  accountCurrencies={["GVT", "BTC", "ETH"]}
                />
                {assetFrom !== CONVERT_ASSET.EXCHANGE_ACCOUNT && (
                  <RowItem>
                    <PeriodLength
                      periods={periods}
                      name={CONVERT_ASSET_FIELDS.periodLength}
                    />
                  </RowItem>
                )}
                <RowItem>
                  <StopOutField name={CONVERT_ASSET_FIELDS.stopOutLevel} />
                </RowItem>
                <RowItem>
                  <TradesDelay name={CONVERT_ASSET_FIELDS.tradesDelay} />
                </RowItem>
              </AssetFields>
            </Row>
            <Row onlyOffset></Row>
          </Row>
        )}
      </SettingsBlock>
      {showProgramFields && (
        <>
          <SettingsBlock
            label={t("create-account:settings.fees-settings")}
            blockNumber={"02"}
          >
            <FeesSettings
              title={t("create-account:settings.investment-program-fees")}
              firstFeeLabel={t("asset-settings:fields.management-fee")}
              firstFeeUnderText={t(
                "create-account:settings.hints.management-fee"
              )}
              firstFeeName={CONVERT_ASSET_FIELDS.entryFee}
              firstFeeDescription={t(
                "create-account:settings.hints.management-fee-description"
              )}
              secondFeeName={CONVERT_ASSET_FIELDS.successFee}
              secondFeeLabel={t("asset-settings:fields.success-fee")}
              secondFeeUnderText={t(
                "create-account:settings.hints.success-fee"
              )}
              secondFeeDescription={t(
                "create-account:settings.hints.success-fee-description"
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
              inputName={CONVERT_ASSET_FIELDS.investmentLimit}
              hasInvestmentLimit={hasInvestmentLimit}
              currency={currency as CurrencyEnum}
            />
          </SettingsBlock>
        </>
      )}
      {showSignalFees && (
        <SettingsBlock
          label={t("create-account:settings.signal-provider-fees")}
          blockNumber={"02"}
        >
          <SignalsFeeFormPartial
            volumeFeeFieldName={CONVERT_ASSET_FIELDS.volumeFee}
            successFeeFieldName={CONVERT_ASSET_FIELDS.successFee}
          />
        </SettingsBlock>
      )}
      <Row size={"large"}>
        <CreateAssetNavigation asset={assetTo} isSuccessful={!errorMessage} />
      </Row>
    </HookForm>
  );
};

const ConvertAssetSettings = withLoader(React.memo(_ConvertAssetSettings));
export default ConvertAssetSettings;
