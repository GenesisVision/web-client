import { SignalSubscription, SubscriptionMode } from "gv-api-web";
import { TFunction } from "i18next";
import { FollowParamsFormValues } from "modules/follow-module/follow-popup/follow-popup-params";
import { CurrencyEnum } from "utils/types";
import { lazy, number, object, Schema } from "yup";

export enum FOLLOW_PARAMS_FIELDS {
  fixedCurrency = "fixedCurrency",
  mode = "mode",
  openTolerancePercent = "openTolerancePercent",
  percent = "percent",
  fixedVolume = "fixedVolume"
}

export type mode = {
  label: string;
  tooltip: string;
  value: SubscriptionMode;
};

export const modes: { [key: string]: mode } = {
  byBalance: {
    label: "follow-program.modes.bybalance.label",
    tooltip: "follow-program.modes.bybalance.tooltip",
    value: "ByBalance"
  },
  percentage: {
    label: "follow-program.modes.percent.label",
    tooltip: "follow-program.modes.percent.tooltip",
    value: "Percent"
  },
  fixed: {
    label: "follow-program.modes.fixed.label",
    tooltip: "follow-program.modes.fixed.tooltip",
    value: "Fixed"
  }
};

export const followParamsMapPropsToValues = ({
  paramsSubscription,
  subscribeFixedCurrencies
}: {
  subscribeFixedCurrencies: string[];
  paramsSubscription?: SignalSubscription;
}) => {
  return {
    [FOLLOW_PARAMS_FIELDS.fixedCurrency]: subscribeFixedCurrencies[0],
    [FOLLOW_PARAMS_FIELDS.mode]: paramsSubscription
      ? paramsSubscription.mode
      : (modes.byBalance.value as SubscriptionMode),
    [FOLLOW_PARAMS_FIELDS.openTolerancePercent]: paramsSubscription
      ? paramsSubscription.openTolerancePercent
      : 0.5,
    [FOLLOW_PARAMS_FIELDS.fixedVolume]:
      paramsSubscription && paramsSubscription.fixedVolume
        ? paramsSubscription.fixedVolume
        : 100,
    [FOLLOW_PARAMS_FIELDS.percent]:
      paramsSubscription && paramsSubscription.percent
        ? paramsSubscription.percent
        : 10
  };
};

export const followParamsValidationSchema = (t: TFunction) =>
  lazy<FollowParamsFormValues>(values => {
    const fixedCurrency = values[FOLLOW_PARAMS_FIELDS.fixedCurrency];
    const mode = values[FOLLOW_PARAMS_FIELDS.mode];
    return object<FollowParamsFormValues>().shape({
      [FOLLOW_PARAMS_FIELDS.fixedVolume]:
        mode === modes.fixed.value
          ? number()
              .min(
                0,
                t("validations.fixedVolume-min", {
                  fixedCurrency
                })
              )
              .lessThan(
                100000,
                t("validations.fixedVolume-max", {
                  fixedCurrency
                })
              )
          : number(),
      [FOLLOW_PARAMS_FIELDS.percent]:
        mode === modes.percentage.value
          ? number()
              .min(1, t("validations.percent-min"))
              .lessThan(1000, t("validations.percent-max"))
          : number(),
      [FOLLOW_PARAMS_FIELDS.openTolerancePercent]: number()
        .required(t("validations.tolerance-required"))
        .min(0.01, t("validations.tolerance-percent-min"))
        .max(20, t("validations.tolerance-percent-max"))
    }) as Schema<FollowParamsFormValues>;
  });

export const getInfoText = (currency: CurrencyEnum): string => {
  switch (currency) {
    case "ETH":
      return "follow-program.info.ETH";
    case "BTC":
      return "follow-program.info.BTC";
    case "USDT":
    default:
      return "follow-program.info.USDT";
  }
};
