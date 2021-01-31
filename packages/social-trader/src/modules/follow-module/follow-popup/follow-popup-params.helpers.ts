import { SignalSubscription, SubscriptionMode } from "gv-api-web";
import { TFunction } from "i18next";
import { CurrencyEnum } from "utils/types";
import { lessThan } from "utils/validators/validators";

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

export const fixedVolumeRules = (t: TFunction, fixedCurrency: string) => ({
  min: {
    value: 0,
    message: t("validations.fixedVolume-min", {
      fixedCurrency
    })
  },
  validate: lessThan(
    100000,
    t("validations.fixedVolume-max", {
      fixedCurrency
    })
  )
});

export const percentRules = (t: TFunction) => ({
  min: {
    value: 1,
    message: t("validations.percent-min")
  },
  validate: lessThan(1000, t("validations.percent-max"))
});

export const openTolerancePercentRules = (t: TFunction) => ({
  required: t("validations.tolerance-required"),
  min: {
    value: 0.01,
    message: t("validations.tolerance-percent-min")
  },
  max: {
    value: 20,
    message: t("validations.tolerance-percent-max")
  }
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
