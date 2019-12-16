import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogButtons } from "components/dialog/dialog-buttons";
import { DialogField } from "components/dialog/dialog-field";
import { DialogInfo } from "components/dialog/dialog-info";
import GVButton from "components/gv-button";
import GVFormikField from "components/gv-formik-field";
import GVTextField from "components/gv-text-field";
import InputAmountField from "components/input-amount-field/input-amount-field";
import Select from "components/select/select";
import { TooltipLabel } from "components/tooltip-label/tooltip-label";
import Tooltip from "components/tooltip/tooltip";
import { InjectedFormikProps, withFormik } from "formik";
import { SignalSubscription, SubscriptionMode } from "gv-api-web";
import React, { useCallback } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { compose } from "redux";
import { convertFromCurrency } from "shared/utils/currency-converter";
import { formatCurrencyValue } from "utils/formatter";
import { CurrencyEnum, SetSubmittingType } from "utils/types";
import { lazy, number, object } from "yup";

const getInfoText = (currency: CurrencyEnum): string => {
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

const _FollowParams: React.FC<
  InjectedFormikProps<Props, FollowParamsFormValues>
> = ({
  subscribeFixedCurrencies,
  rate,
  currency,
  t,
  setFieldValue,
  isSubmitting,
  onPrevStep,
  isValid,
  values,
  handleSubmit
}) => {
  const setMaxOpenTolerancePercent = useCallback(() => {
    setFieldValue(FIELDS.openTolerancePercent, "20");
  }, [setFieldValue]);
  const setMaxVolumePercent = useCallback(() => {
    setFieldValue(FIELDS.percent, "999");
  }, [setFieldValue]);
  const disableButton = isSubmitting || !isValid;
  return (
    <form id="follow-params" onSubmit={handleSubmit}>
      <DialogBottom>
        <DialogField>
          <GVFormikField
            name={FIELDS.mode}
            component={GVTextField}
            label={t("follow-program.params.type")}
            InputComponent={Select}
          >
            {Object.keys(modes).map((mode: string) => (
              <option value={modes[mode].value} key={modes[mode].value}>
                <Tooltip
                  render={() => (
                    <div className="tooltip__content">
                      {t(modes[mode].tooltip)}
                    </div>
                  )}
                >
                  <span>{t(modes[mode].label)}</span>
                </Tooltip>
              </option>
            ))}
          </GVFormikField>
        </DialogField>
        {values[FIELDS.mode] === modes.percentage.value && (
          <DialogField>
            <InputAmountField
              name={FIELDS.percent}
              label={t("follow-program.params.volume-percent")}
              currency={"%"}
              setMax={setMaxVolumePercent}
            />
          </DialogField>
        )}
        {values[FIELDS.mode] === modes.fixed.value && (
          <>
            {subscribeFixedCurrencies.length > 1 && (
              <DialogField>
                <GVFormikField
                  name={FIELDS.fixedCurrency}
                  component={GVTextField}
                  label={t("follow-program.params.fixed-currency")}
                  InputComponent={Select}
                >
                  {subscribeFixedCurrencies.map((currency: string) => (
                    <option value={currency} key={currency}>
                      {currency}
                    </option>
                  ))}
                </GVFormikField>
              </DialogField>
            )}
            <DialogField>
              <InputAmountField
                name={FIELDS.fixedVolume}
                label={`${t("follow-program.params.fixed-currency-equivalent", {
                  fixedCurrency: values[FIELDS.fixedCurrency]
                })} *`}
                currency={values[FIELDS.fixedCurrency]}
              />
              {currency && (
                <NumberFormat
                  value={formatCurrencyValue(
                    convertFromCurrency(values[FIELDS.fixedVolume]!, rate),
                    currency
                  )}
                  prefix="≈ "
                  suffix={` ${currency}`}
                  displayType="text"
                />
              )}
            </DialogField>
          </>
        )}
        <DialogField>
          <InputAmountField
            name={FIELDS.openTolerancePercent}
            label={
              <TooltipLabel
                tooltipContent={t(
                  "follow-program.params.tolerance-percent-tooltip"
                )}
                labelText={t("follow-program.params.tolerance-percent")}
              />
            }
            currency={"%"}
            setMax={setMaxOpenTolerancePercent}
          />
        </DialogField>
        <DialogButtons>
          {onPrevStep && (
            <GVButton onClick={onPrevStep} color="secondary" variant="outlined">
              {t("follow-program.params.back")}
            </GVButton>
          )}
          <GVButton
            type="submit"
            className="invest-form__submit-button"
            disabled={disableButton}
          >
            {t("follow-program.params.submit")}
          </GVButton>
        </DialogButtons>
        {values[FIELDS.mode] === modes.fixed.value && currency && (
          <DialogInfo>* {t(getInfoText(currency))}</DialogInfo>
        )}
      </DialogBottom>
    </form>
  );
};

enum FIELDS {
  fixedCurrency = "fixedCurrency",
  mode = "mode",
  openTolerancePercent = "openTolerancePercent",
  percent = "percent",
  fixedVolume = "fixedVolume"
}

type mode = {
  label: string;
  tooltip: string;
  value: SubscriptionMode;
};

const modes: { [key: string]: mode } = {
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

export interface FollowParamsFormValues {
  [FIELDS.fixedCurrency]: string;
  [FIELDS.mode]: SubscriptionMode;
  [FIELDS.openTolerancePercent]: number;
  [FIELDS.percent]: number;
  [FIELDS.fixedVolume]: number;
}

interface OwnProps {
  subscribeFixedCurrencies: string[];
  rate: number;
  currency?: CurrencyEnum;
  paramsSubscription?: SignalSubscription;
  onSubmit: (
    values: FollowParamsFormValues,
    setSubmitting: SetSubmittingType
  ) => void;
  onPrevStep?: () => void;
}

interface Props extends OwnProps, WithTranslation {}

const FollowParams = compose<React.ComponentType<OwnProps>>(
  translate(),
  withFormik<Props, FollowParamsFormValues>({
    isInitialValid: true,
    displayName: "follow-params",
    mapPropsToValues: ({ paramsSubscription, subscribeFixedCurrencies }) => {
      return {
        [FIELDS.fixedCurrency]: subscribeFixedCurrencies[0],
        [FIELDS.mode]: paramsSubscription
          ? paramsSubscription.mode
          : (modes.byBalance.value as SubscriptionMode),
        [FIELDS.openTolerancePercent]: paramsSubscription
          ? paramsSubscription.openTolerancePercent
          : 0.5,
        [FIELDS.fixedVolume]: paramsSubscription
          ? paramsSubscription.fixedVolume
          : 100,
        [FIELDS.percent]: paramsSubscription ? paramsSubscription.percent : 10
      };
    },
    validationSchema: ({ t }: Props) =>
      lazy<FollowParamsFormValues>(values =>
        object<FollowParamsFormValues>().shape({
          [FIELDS.fixedVolume]: number()
            .min(
              0,
              t("follow-program.params.validation.fixedVolume-min", {
                fixedCurrency: values[FIELDS.fixedCurrency]
              })
            )
            .lessThan(
              100000,
              t("follow-program.params.validation.fixedVolume-max", {
                fixedCurrency: values[FIELDS.fixedCurrency]
              })
            ),
          [FIELDS.percent]: number()
            .min(1, t("follow-program.params.validation.percent-min"))
            .lessThan(1000, t("follow-program.params.validation.percent-max")),
          [FIELDS.openTolerancePercent]: number()
            .required(t("follow-program.params.validation.tolerance-required"))
            .min(
              0.01,
              t("follow-program.params.validation.tolerance-percent-min")
            )
            .max(
              20,
              t("follow-program.params.validation.tolerance-percent-max")
            )
        })
      ),
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  }),
  React.memo
)(_FollowParams);
export default FollowParams;
