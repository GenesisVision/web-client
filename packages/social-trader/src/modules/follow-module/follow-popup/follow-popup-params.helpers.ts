import { SubscriptionMode } from "gv-api-web";
import {
  FollowParamsFormValues,
  IFollowParamsProps
} from "modules/follow-module/follow-popup/follow-popup-params";
import { lazy, number, object } from "yup";

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
    label: "follow-program.modes.byBalance.label",
    tooltip: "follow-program.modes.byBalance.tooltip",
    value: "ByBalance"
  },
  percentage: {
    label: "follow-program.modes.percentage.label",
    tooltip: "follow-program.modes.percentage.tooltip",
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
}: IFollowParamsProps) => {
  return {
    [FOLLOW_PARAMS_FIELDS.fixedCurrency]: subscribeFixedCurrencies[0],
    [FOLLOW_PARAMS_FIELDS.mode]: paramsSubscription
      ? paramsSubscription.mode
      : (modes.byBalance.value as SubscriptionMode),
    [FOLLOW_PARAMS_FIELDS.openTolerancePercent]: paramsSubscription
      ? paramsSubscription.openTolerancePercent
      : 0.5,
    [FOLLOW_PARAMS_FIELDS.fixedVolume]: paramsSubscription
      ? paramsSubscription.fixedVolume
      : 100,
    [FOLLOW_PARAMS_FIELDS.percent]: paramsSubscription
      ? paramsSubscription.percent
      : 10
  };
};

export const followParamsValidationSchema = ({ t }: IFollowParamsProps) =>
  lazy<FollowParamsFormValues>(values =>
    object<FollowParamsFormValues>().shape({
      [FOLLOW_PARAMS_FIELDS.fixedVolume]: number()
        .min(
          0,
          t("follow-program.params.validation.fixedVolume-min", {
            fixedCurrency: values[FOLLOW_PARAMS_FIELDS.fixedCurrency]
          })
        )
        .lessThan(
          100000,
          t("follow-program.params.validation.fixedVolume-max", {
            fixedCurrency: values[FOLLOW_PARAMS_FIELDS.fixedCurrency]
          })
        ),
      [FOLLOW_PARAMS_FIELDS.percent]: number()
        .min(1, t("follow-program.params.validation.percent-min"))
        .lessThan(1000, t("follow-program.params.validation.percent-max")),
      [FOLLOW_PARAMS_FIELDS.openTolerancePercent]: number()
        .required(t("follow-program.params.validation.tolerance-required"))
        .min(0.01, t("follow-program.params.validation.tolerance-percent-min"))
        .max(20, t("follow-program.params.validation.tolerance-percent-max"))
    })
  );
