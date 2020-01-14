import inputImageShape from "components/form/input-image/input-image.validation";
import i18next from "i18next";
import { CONVERT_ASSET } from "pages/convert-asset/convert-asset.contants";
import {
  assetDescriptionShape,
  assetTitleShape,
  entryFeeShape,
  signalSuccessFeeShape,
  signalVolumeFeeShape,
  successFeeShape
} from "utils/validators/validators";
import { boolean, mixed, number, object, string } from "yup";

import {
  IConvertAssetSettingsFormValues,
  IConvertAssetSettingsProps
} from "./convert-asset-settings";

export const convertAssetMapPropsToValues = ({
  currency,
  programsInfo: { periods }
}: IConvertAssetSettingsProps): IConvertAssetSettingsFormValues => ({
  [CONVERT_ASSET_FIELDS.available]: 0,
  [CONVERT_ASSET_FIELDS.rate]: 1,
  [CONVERT_ASSET_FIELDS.tradesDelay]: "None",
  [CONVERT_ASSET_FIELDS.stopOutLevel]: 100,
  [CONVERT_ASSET_FIELDS.title]: "",
  [CONVERT_ASSET_FIELDS.description]: "",
  [CONVERT_ASSET_FIELDS.logo]: {},
  [CONVERT_ASSET_FIELDS.entryFee]: undefined,
  [CONVERT_ASSET_FIELDS.successFee]: undefined,
  [CONVERT_ASSET_FIELDS.hasInvestmentLimit]: false,
  [CONVERT_ASSET_FIELDS.investmentLimit]: undefined,
  [CONVERT_ASSET_FIELDS.isSignalProgram]: true, // TODO move back to server
  [CONVERT_ASSET_FIELDS.successFee]: undefined,
  [CONVERT_ASSET_FIELDS.currency]: currency || "GVT",
  [CONVERT_ASSET_FIELDS.volumeFee]: undefined,
  [CONVERT_ASSET_FIELDS.periodLength]:
    periods.length === 1 ? periods[0] : undefined
});

const convertAssetSettingsValidationSchema = (
  props: IConvertAssetSettingsProps
) => {
  switch (props.fromTo.assetFrom + props.fromTo.assetTo) {
    case CONVERT_ASSET.SIGNAL + CONVERT_ASSET.PROGRAM:
      return convertSignalToProgramValidationSchema(props);
    case CONVERT_ASSET.ACCOUNT + CONVERT_ASSET.PROGRAM:
      return convertAccountToProgramValidationSchema(props);
    default:
      return convertToSignalValidationSchema(props);
  }
};

const convertSignalToProgramValidationSchema = ({
  t,
  programsInfo
}: IConvertAssetSettingsProps) =>
  object<IConvertAssetSettingsFormValues>().shape({
    ...getProgramShapes(
      t,
      programsInfo.createProgramInfo.maxEntryFee,
      programsInfo.createProgramInfo.maxSuccessFee
    )
  });

const convertAccountToProgramValidationSchema = ({
  t,
  programsInfo
}: IConvertAssetSettingsProps) =>
  object<IConvertAssetSettingsFormValues>().shape({
    ...getPublicInfoShapes(t),
    ...getProgramShapes(
      t,
      programsInfo.createProgramInfo.maxEntryFee,
      programsInfo.createProgramInfo.maxSuccessFee
    )
  });

const convertToSignalValidationSchema = ({
  t,
  followInfo: { maxSuccessFee, maxVolumeFee, minSuccessFee, minVolumeFee }
}: IConvertAssetSettingsProps) =>
  object<IConvertAssetSettingsFormValues>().shape({
    ...getPublicInfoShapes(t),
    ...getSignalShapes(
      t,
      minSuccessFee,
      maxSuccessFee,
      minVolumeFee,
      maxVolumeFee
    )
  });

export enum CONVERT_ASSET_FIELDS {
  id = "id",
  available = "available",
  rate = "rate",
  tradesDelay = "tradesDelay",
  currency = "currency",
  periodLength = "periodLength",
  successFee = "successFee",
  stopOutLevel = "stopOutLevel",
  volumeFee = "volumeFee",
  isSignalProgram = "isSignalProgram",
  hasInvestmentLimit = "hasInvestmentLimit",
  title = "title",
  description = "description",
  logo = "logo",
  entryFee = "entryFee",
  investmentLimit = "investmentLimit"
}

const investmentLimitShape = (
  hasInvestmentLimitName: string,
  t: i18next.TFunction
) =>
  mixed().when(hasInvestmentLimitName, {
    is: true,
    then: number()
      .min(0, t("create-program-page.settings.validation.investment-limit-min"))
      .lessThan(10000000000, "Investment Limit must be less than 10000000000")
      .required(
        t("create-program-page.settings.validation.investment-limit-required")
      )
  });

const stopOutLevelShape = (t: i18next.TFunction) =>
  number()
    .required(t("create-program-page.settings.validation.stop-out-required"))
    .min(10, t("create-program-page.settings.validation.stop-out-is-zero"))
    .max(100, t("create-program-page.settings.validation.stop-out-is-large"));

const currencyShape = (t: i18next.TFunction) =>
  string().required(
    t("create-program-page.settings.validation.currency-required")
  );

const periodLengthShape = (t: i18next.TFunction) =>
  number().required(
    t("create-program-page.settings.validation.period-required")
  );

const getPublicInfoShapes = (t: i18next.TFunction) => ({
  [CONVERT_ASSET_FIELDS.logo]: inputImageShape(t),
  [CONVERT_ASSET_FIELDS.title]: assetTitleShape(t),
  [CONVERT_ASSET_FIELDS.description]: assetDescriptionShape(t)
});

const getSignalShapes = (
  t: i18next.TFunction,
  minSuccessFee: number,
  maxSuccessFee: number,
  minVolumeFee: number,
  maxVolumeFee: number
) => ({
  [CONVERT_ASSET_FIELDS.isSignalProgram]: boolean(),
  [CONVERT_ASSET_FIELDS.volumeFee]: mixed().when(
    CONVERT_ASSET_FIELDS.isSignalProgram,
    {
      is: true,
      then: signalVolumeFeeShape(t, minVolumeFee, maxVolumeFee)
    }
  ),
  [CONVERT_ASSET_FIELDS.successFee]: mixed().when(
    CONVERT_ASSET_FIELDS.isSignalProgram,
    {
      is: true,
      then: signalSuccessFeeShape(t, minSuccessFee, maxSuccessFee)
    }
  )
});

const getProgramShapes = (
  t: i18next.TFunction,
  maxEntryFee: number,
  maxSuccessFee: number
) => ({
  [CONVERT_ASSET_FIELDS.currency]: currencyShape(t),
  [CONVERT_ASSET_FIELDS.periodLength]: periodLengthShape(t),
  [CONVERT_ASSET_FIELDS.stopOutLevel]: stopOutLevelShape(t),
  [CONVERT_ASSET_FIELDS.entryFee]: entryFeeShape(t, maxEntryFee),
  [CONVERT_ASSET_FIELDS.successFee]: successFeeShape(t, maxSuccessFee),
  [CONVERT_ASSET_FIELDS.hasInvestmentLimit]: boolean(),
  [CONVERT_ASSET_FIELDS.investmentLimit]: investmentLimitShape(
    CONVERT_ASSET_FIELDS.hasInvestmentLimit,
    t
  )
});

export default convertAssetSettingsValidationSchema;
