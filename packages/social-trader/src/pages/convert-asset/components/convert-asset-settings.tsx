import CreateAssetNavigation from "components/assets/fields/create-asset-navigation";
import Currency from "components/assets/fields/currency";
import DescriptionBlock from "components/assets/fields/description-block";
import FeesSettings from "components/assets/fields/fees-settings";
import InvestmentLimitField from "components/assets/fields/investment-limit-field";
import PeriodLength from "components/assets/fields/period-length";
import SignalsFeeFormPartial from "components/assets/fields/signals-fee-form.partial";
import StopOutField from "components/assets/fields/stop-out-field";
import TradesDelay from "components/assets/fields/trades-delay";
import { IImageValue } from "components/form/input-image/input-image";
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
  const { description, currency } = watch();

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
        <div>
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
            <Row size={"large"}>
              <div>
                <Currency
                  hide={!showCurrency}
                  name={CONVERT_ASSET_FIELDS.currency}
                  accountCurrencies={["GVT", "BTC", "ETH"]}
                />
                <PeriodLength
                  periods={periods}
                  name={CONVERT_ASSET_FIELDS.periodLength}
                />
                <StopOutField name={CONVERT_ASSET_FIELDS.stopOutLevel} />
                <Row onlyOffset size={"large"}>
                  <TradesDelay name={CONVERT_ASSET_FIELDS.tradesDelay} />
                </Row>
              </div>
            </Row>
          )}
        </div>
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

const ConvertAssetSettings = withLoader(React.memo(_ConvertAssetSettings));
export default ConvertAssetSettings;
