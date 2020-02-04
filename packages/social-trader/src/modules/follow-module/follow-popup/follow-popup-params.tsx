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
import { TooltipContent } from "components/tooltip/tooltip-content";
import { InjectedFormikProps, withFormik } from "formik";
import { SignalSubscription, SubscriptionMode } from "gv-api-web";
import {
  FOLLOW_PARAMS_FIELDS,
  followParamsMapPropsToValues,
  followParamsValidationSchema,
  modes
} from "modules/follow-module/follow-popup/follow-popup-params.helpers";
import React, { useCallback } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { compose } from "redux";
import { convertFromCurrency } from "utils/currency-converter";
import { formatCurrencyValue } from "utils/formatter";
import { CurrencyEnum, SetSubmittingType } from "utils/types";

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

const _FollowParams: React.FC<InjectedFormikProps<
  IFollowParamsProps,
  FollowParamsFormValues
>> = ({
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
    setFieldValue(FOLLOW_PARAMS_FIELDS.openTolerancePercent, "20");
  }, [setFieldValue]);
  const setMaxVolumePercent = useCallback(() => {
    setFieldValue(FOLLOW_PARAMS_FIELDS.percent, "999");
  }, [setFieldValue]);
  const disableButton = isSubmitting || !isValid;
  return (
    <form id="follow-params" onSubmit={handleSubmit}>
      <DialogBottom>
        <DialogField>
          <GVFormikField
            wide
            name={FOLLOW_PARAMS_FIELDS.mode}
            component={GVTextField}
            label={t("follow-program.params.type")}
            InputComponent={Select}
          >
            {Object.keys(modes).map((mode: string) => (
              <option value={modes[mode].value} key={modes[mode].value}>
                <Tooltip
                  render={() => (
                    <TooltipContent>{t(modes[mode].tooltip)}</TooltipContent>
                  )}
                >
                  <span>{t(modes[mode].label)}</span>
                </Tooltip>
              </option>
            ))}
          </GVFormikField>
        </DialogField>
        {values[FOLLOW_PARAMS_FIELDS.mode] === modes.percentage.value && (
          <DialogField>
            <InputAmountField
              wide
              name={FOLLOW_PARAMS_FIELDS.percent}
              label={t("follow-program.params.volume-percent")}
              currency={"%"}
              setMax={setMaxVolumePercent}
            />
          </DialogField>
        )}
        {values[FOLLOW_PARAMS_FIELDS.mode] === modes.fixed.value && (
          <>
            {subscribeFixedCurrencies.length > 1 && (
              <DialogField>
                <GVFormikField
                  wide
                  name={FOLLOW_PARAMS_FIELDS.fixedCurrency}
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
                wide
                name={FOLLOW_PARAMS_FIELDS.fixedVolume}
                label={`${t("follow-program.params.fixed-currency-equivalent", {
                  fixedCurrency: values[FOLLOW_PARAMS_FIELDS.fixedCurrency]
                })} *`}
                currency={values[FOLLOW_PARAMS_FIELDS.fixedCurrency]}
              />
              {currency && (
                <NumberFormat
                  value={formatCurrencyValue(
                    convertFromCurrency(
                      values[FOLLOW_PARAMS_FIELDS.fixedVolume]!,
                      rate
                    ),
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
            wide
            name={FOLLOW_PARAMS_FIELDS.openTolerancePercent}
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
            wide={!onPrevStep}
            type="submit"
            className="invest-form__submit-button"
            disabled={disableButton}
          >
            {t("follow-program.params.submit")}
          </GVButton>
        </DialogButtons>
        {values[FOLLOW_PARAMS_FIELDS.mode] === modes.fixed.value &&
          currency && <DialogInfo>* {t(getInfoText(currency))}</DialogInfo>}
      </DialogBottom>
    </form>
  );
};

export interface FollowParamsFormValues {
  [FOLLOW_PARAMS_FIELDS.fixedCurrency]: string;
  [FOLLOW_PARAMS_FIELDS.mode]: SubscriptionMode;
  [FOLLOW_PARAMS_FIELDS.openTolerancePercent]: number;
  [FOLLOW_PARAMS_FIELDS.percent]: number;
  [FOLLOW_PARAMS_FIELDS.fixedVolume]: number;
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

export interface IFollowParamsProps extends OwnProps, WithTranslation {}

const FollowParams = compose<React.ComponentType<OwnProps>>(
  translate(),
  withFormik<IFollowParamsProps, FollowParamsFormValues>({
    isInitialValid: true,
    displayName: "follow-params",
    mapPropsToValues: followParamsMapPropsToValues,
    validationSchema: followParamsValidationSchema,
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  }),
  React.memo
)(_FollowParams);
export default FollowParams;
