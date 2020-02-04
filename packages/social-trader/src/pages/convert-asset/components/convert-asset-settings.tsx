import { AssetFields } from "components/assets/asset-fields/asset-field";
import useAssetValidate from "components/assets/asset-validate.hook";
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
import SettingsBlock from "components/settings-block/settings-block";
import { ASSET } from "constants/constants";
import withLoader, { WithLoaderProps } from "decorators/with-loader";
import { InjectedFormikProps, withFormik } from "formik";
import {
  FollowCreateAssetPlatformInfo,
  ProgramAssetPlatformInfo,
  TradesDelay as TradesDelayType
} from "gv-api-web";
import { CONVERT_ASSET } from "pages/convert-asset/convert-asset.contants";
import { TAssetFromTo } from "pages/convert-asset/convert-asset.types";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import { CurrencyEnum, SetSubmittingType } from "utils/types";

import convertAssetSettingsValidationSchema, {
  CONVERT_ASSET_FIELDS,
  convertAssetMapPropsToValues
} from "./convert-asset-settings.helpers";

const _ConvertAssetSettings: React.FC<Props> = ({
  broker,
  fromTo: { assetTo, assetFrom },
  programsInfo: { periods },
  t,
  isValid,
  handleSubmit,
  isSubmitting,
  values: { hasInvestmentLimit, description, currency }
}) => {
  const validateAndSubmit = useAssetValidate({ handleSubmit, isValid });
  const showDescriptionBlock = assetFrom !== CONVERT_ASSET.SIGNAL;
  const showSignalFees = assetTo === CONVERT_ASSET.SIGNAL;
  const showProgramFields = assetTo === CONVERT_ASSET.PROGRAM;
  const showCurrency = broker === "Huobi";
  return (
    <form onSubmit={validateAndSubmit}>
      <SettingsBlock
        label={t("create-program-page.settings.main-settings")}
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
          <AssetFields>
            {showCurrency && (
              <Currency
                name={CONVERT_ASSET_FIELDS.currency}
                disabled={false}
                accountCurrencies={["GVT", "BTC", "ETH"]}
              />
            )}
            <PeriodLength
              periods={periods}
              name={CONVERT_ASSET_FIELDS.periodLength}
            />
            <StopOutField name={CONVERT_ASSET_FIELDS.stopOutLevel} />
            <TradesDelay name={CONVERT_ASSET_FIELDS.tradesDelay} />
          </AssetFields>
        )}
      </SettingsBlock>
      {showProgramFields && (
        <>
          <SettingsBlock
            label={t("create-program-page.settings.fees-settings")}
            blockNumber={"02"}
          >
            <FeesSettings
              title={t("create-program-page.settings.investment-program-fees")}
              entryFeeName={CONVERT_ASSET_FIELDS.entryFee}
              entryFeeDescription={t(
                "create-program-page.settings.hints.entry-fee-description"
              )}
              secondFeeName={CONVERT_ASSET_FIELDS.successFee}
              secondFeeLabel={t(
                "create-program-page.settings.fields.success-fee"
              )}
              secondFeeUnderText={t(
                "create-program-page.settings.hints.success-fee"
              )}
              secondFeeDescription={t(
                "create-program-page.settings.hints.success-fee-description"
              )}
            />
          </SettingsBlock>
          <SettingsBlock
            label={t("create-program-page.settings.fields.investment-limit")}
            blockNumber={"03"}
          >
            <InvestmentLimitField
              checkboxName={CONVERT_ASSET_FIELDS.hasInvestmentLimit}
              inputName={CONVERT_ASSET_FIELDS.investmentLimit}
              hasInvestmentLimit={hasInvestmentLimit}
              currency={currency as CurrencyEnum}
            />
          </SettingsBlock>
        </>
      )}
      {showSignalFees && (
        <SettingsBlock
          label={t("create-program-page.settings.signal-provider-fees")}
          blockNumber={"02"}
        >
          <SignalsFeeFormPartial
            volumeFeeFieldName={CONVERT_ASSET_FIELDS.volumeFee}
            successFeeFieldName={CONVERT_ASSET_FIELDS.successFee}
          />
        </SettingsBlock>
      )}
      <CreateAssetNavigation asset={assetTo} isSubmitting={isSubmitting} />
    </form>
  );
};

export interface IConvertAssetSettingsFormOwnProps {
  currency?: CurrencyEnum;
  id: string;
  broker?: string;
  fromTo: TAssetFromTo;
}

interface OwnProps extends IConvertAssetSettingsFormOwnProps {
  followInfo: FollowCreateAssetPlatformInfo;
  programsInfo: ProgramAssetPlatformInfo;
  onSubmit: (
    data: IConvertAssetSettingsFormValues,
    setSubmitting: SetSubmittingType
  ) => void;
}

export interface IConvertAssetSettingsProps extends OwnProps, WithTranslation {}

export interface IConvertAssetSettingsFormValues {
  [CONVERT_ASSET_FIELDS.id]?: string;
  [CONVERT_ASSET_FIELDS.currency]: string;
  [CONVERT_ASSET_FIELDS.available]: number;
  [CONVERT_ASSET_FIELDS.rate]: number;
  [CONVERT_ASSET_FIELDS.tradesDelay]: TradesDelayType;
  [CONVERT_ASSET_FIELDS.periodLength]?: number;
  [CONVERT_ASSET_FIELDS.successFee]?: number;
  [CONVERT_ASSET_FIELDS.stopOutLevel]: number;
  [CONVERT_ASSET_FIELDS.successFee]?: number;
  [CONVERT_ASSET_FIELDS.volumeFee]?: number;
  [CONVERT_ASSET_FIELDS.isSignalProgram]: boolean;
  [CONVERT_ASSET_FIELDS.hasInvestmentLimit]: boolean;
  [CONVERT_ASSET_FIELDS.title]: string;
  [CONVERT_ASSET_FIELDS.description]: string;
  [CONVERT_ASSET_FIELDS.logo]: IImageValue;
  [CONVERT_ASSET_FIELDS.entryFee]?: number;
  [CONVERT_ASSET_FIELDS.investmentLimit]?: number;
}

type Props = InjectedFormikProps<
  IConvertAssetSettingsProps,
  IConvertAssetSettingsFormValues
>;

const ConvertAssetSettings = compose<
  React.ComponentType<OwnProps & WithLoaderProps>
>(
  withLoader,
  translate(),
  withFormik<IConvertAssetSettingsProps, IConvertAssetSettingsFormValues>({
    displayName: "ConvertAssetSettingsForm",
    mapPropsToValues: convertAssetMapPropsToValues,
    validationSchema: convertAssetSettingsValidationSchema,
    handleSubmit: (values, { props: { id, onSubmit }, setSubmitting }) => {
      onSubmit({ ...values, id }, setSubmitting);
    }
  }),
  React.memo
)(_ConvertAssetSettings);
export default ConvertAssetSettings;
