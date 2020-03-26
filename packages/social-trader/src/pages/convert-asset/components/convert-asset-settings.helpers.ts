import inputImageShape from "components/form/input-image/input-image.validation";
import {
  FollowCreateAssetPlatformInfo,
  ProgramAssetPlatformInfo
} from "gv-api-web";
import i18next, { TFunction } from "i18next";
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

const convertAssetSettingsValidationSchema = ({
  hasInvestmentLimit,
  isSignalProgram,
  programsInfo,
  followInfo,
  t,
  fromTo
}: IConvertAssetSettingsProps & {
  t: TFunction;
  hasInvestmentLimit: boolean;
  isSignalProgram: boolean;
}) => {
  switch (fromTo.assetFrom + fromTo.assetTo) {
    case CONVERT_ASSET.SIGNAL + CONVERT_ASSET.PROGRAM:
      return convertSignalToProgramValidationSchema({
        t,
        programsInfo,
        hasInvestmentLimit
      });
    case CONVERT_ASSET.ACCOUNT + CONVERT_ASSET.PROGRAM:
      return convertAccountToProgramValidationSchema({
        t,
        programsInfo,
        hasInvestmentLimit
      });
    default:
      return convertToSignalValidationSchema({
        t,
        followInfo,
        isSignalProgram
      });
  }
};

const convertSignalToProgramValidationSchema = ({
  t,
  hasInvestmentLimit,
  programsInfo: {
    createProgramInfo: { maxManagementFee, maxSuccessFee }
  }
}: {
  t: TFunction;
  programsInfo: ProgramAssetPlatformInfo;
  hasInvestmentLimit: boolean;
}) =>
  object<IConvertAssetSettingsFormValues>().shape({
    ...getProgramShapes({
      t,
      maxManagementFee,
      maxSuccessFee,
      hasInvestmentLimit
    })
  });

const convertAccountToProgramValidationSchema = ({
  t,
  hasInvestmentLimit,
  programsInfo: {
    createProgramInfo: { maxManagementFee, maxSuccessFee }
  }
}: {
  t: TFunction;
  programsInfo: ProgramAssetPlatformInfo;
  hasInvestmentLimit: boolean;
}) =>
  object<IConvertAssetSettingsFormValues>().shape({
    ...getPublicInfoShapes(t),
    ...getProgramShapes({
      hasInvestmentLimit,
      t,
      maxManagementFee,
      maxSuccessFee
    })
  });

const convertToSignalValidationSchema = ({
  isSignalProgram,
  t,
  followInfo: { maxSuccessFee, maxVolumeFee, minSuccessFee, minVolumeFee }
}: {
  isSignalProgram: boolean;
  t: TFunction;
  followInfo: FollowCreateAssetPlatformInfo;
}) =>
  object<IConvertAssetSettingsFormValues>().shape({
    ...getPublicInfoShapes(t),
    ...getSignalShapes({
      isSignalProgram,
      t,
      minSuccessFee,
      maxSuccessFee,
      minVolumeFee,
      maxVolumeFee
    })
  });

export enum CONVERT_ASSET_FIELDS {
  tradesDelay = "tradesDelay",
  currency = "currency",
  periodLength = "periodLength",
  successFee = "successFee",
  stopOutLevel = "stopOutLevel",
  volumeFee = "volumeFee",
  title = "title",
  description = "description",
  logo = "logo",
  entryFee = "entryFee",
  investmentLimit = "investmentLimit"
}

const investmentLimitShape = (
  hasInvestmentLimit: boolean,
  t: i18next.TFunction
) =>
  hasInvestmentLimit
    ? number()
        .min(
          0,
          t("create-program-page.settings.validation.investment-limit-min")
        )
        .lessThan(10000000000, "Investment Limit must be less than 10000000000")
        .required(
          t("create-program-page.settings.validation.investment-limit-required")
        )
    : number();

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

const getSignalShapes = ({
  isSignalProgram,
  t,
  minSuccessFee,
  maxSuccessFee,
  minVolumeFee,
  maxVolumeFee
}: {
  isSignalProgram: boolean;
  t: i18next.TFunction;
  minSuccessFee: number;
  maxSuccessFee: number;
  minVolumeFee: number;
  maxVolumeFee: number;
}) => ({
  [CONVERT_ASSET_FIELDS.volumeFee]: isSignalProgram
    ? signalVolumeFeeShape(t, minVolumeFee, maxVolumeFee)
    : number(),
  [CONVERT_ASSET_FIELDS.successFee]: isSignalProgram
    ? signalSuccessFeeShape(t, minSuccessFee, maxSuccessFee)
    : number()
});

const getProgramShapes = ({
  hasInvestmentLimit,
  t,
  maxManagementFee,
  maxSuccessFee
}: {
  hasInvestmentLimit: boolean;
  t: i18next.TFunction;
  maxManagementFee: number;
  maxSuccessFee: number;
}) => ({
  [CONVERT_ASSET_FIELDS.currency]: currencyShape(t),
  [CONVERT_ASSET_FIELDS.periodLength]: periodLengthShape(t),
  [CONVERT_ASSET_FIELDS.stopOutLevel]: stopOutLevelShape(t),
  [CONVERT_ASSET_FIELDS.entryFee]: entryFeeShape(t, maxManagementFee),
  [CONVERT_ASSET_FIELDS.successFee]: successFeeShape(t, maxSuccessFee),
  [CONVERT_ASSET_FIELDS.investmentLimit]: investmentLimitShape(
    hasInvestmentLimit,
    t
  )
});

export default convertAssetSettingsValidationSchema;
