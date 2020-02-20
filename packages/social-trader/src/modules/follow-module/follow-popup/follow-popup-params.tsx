import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogButtons } from "components/dialog/dialog-buttons";
import { DialogField } from "components/dialog/dialog-field";
import { DialogInfo } from "components/dialog/dialog-info";
import GVButton from "components/gv-button";
import { GVHookFormField } from "components/gv-hook-form-field";
import InputAmountField from "components/input-amount-field/hook-form-amount-field";
import Select from "components/select/select";
import { SimpleTextField } from "components/simple-fields/simple-text-field";
import { SubmitButton } from "components/submit-button/submit-button";
import { TooltipLabel } from "components/tooltip-label/tooltip-label";
import Tooltip from "components/tooltip/tooltip";
import { TooltipContent } from "components/tooltip/tooltip-content";
import { SignalSubscription, SubscriptionMode } from "gv-api-web";
import {
  FOLLOW_PARAMS_FIELDS,
  followParamsMapPropsToValues,
  followParamsValidationSchema,
  getInfoText,
  modes
} from "modules/follow-module/follow-popup/follow-popup-params.helpers";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { convertFromCurrency } from "utils/currency-converter";
import { formatCurrencyValue } from "utils/formatter";
import { HookForm } from "utils/hook-form.helpers";
import { CurrencyEnum } from "utils/types";

const _FollowParams: React.FC<IFollowParamsProps> = ({
  errorMessage,
  onSubmit,
  paramsSubscription,
  subscribeFixedCurrencies,
  rate,
  currency,
  onPrevStep
}) => {
  const [t] = useTranslation();
  const form = useForm<FollowParamsFormValues>({
    defaultValues: followParamsMapPropsToValues({
      paramsSubscription,
      subscribeFixedCurrencies
    }),
    validationSchema: followParamsValidationSchema(t),
    mode: "onBlur"
  });
  const { setValue, watch } = form;

  const { mode, fixedCurrency, fixedVolume } = watch();

  const setMaxOpenTolerancePercent = useCallback(() => {
    setValue(FOLLOW_PARAMS_FIELDS.openTolerancePercent, 20, true);
  }, [setValue]);
  const setMaxVolumePercent = useCallback(() => {
    setValue(FOLLOW_PARAMS_FIELDS.percent, 999, true);
  }, [setValue]);
  return (
    <HookForm form={form} onSubmit={onSubmit}>
      <DialogBottom>
        <DialogField>
          <GVHookFormField
            wide
            name={FOLLOW_PARAMS_FIELDS.mode}
            component={SimpleTextField}
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
          </GVHookFormField>
        </DialogField>
        {mode === modes.percentage.value && (
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
        {mode === modes.fixed.value && (
          <>
            {subscribeFixedCurrencies.length > 1 && (
              <DialogField>
                <GVHookFormField
                  wide
                  name={FOLLOW_PARAMS_FIELDS.fixedCurrency}
                  component={SimpleTextField}
                  label={t("follow-program.params.fixed-currency")}
                  InputComponent={Select}
                >
                  {subscribeFixedCurrencies.map((currency: string) => (
                    <option value={currency} key={currency}>
                      {currency}
                    </option>
                  ))}
                </GVHookFormField>
              </DialogField>
            )}
            <DialogField>
              <InputAmountField
                wide
                name={FOLLOW_PARAMS_FIELDS.fixedVolume}
                label={`${t("follow-program.params.fixed-currency-equivalent", {
                  fixedCurrency: fixedCurrency
                })} *`}
                currency={fixedCurrency}
              />
              {currency && (
                <NumberFormat
                  value={formatCurrencyValue(
                    convertFromCurrency(fixedVolume!, rate),
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
          <SubmitButton
            wide={!onPrevStep}
            className="invest-form__submit-button"
            isSuccessful={!errorMessage}
            checkDirty={!onPrevStep}
          >
            {t("follow-program.params.submit")}
          </SubmitButton>
        </DialogButtons>
        {mode === modes.fixed.value && currency && (
          <DialogInfo>* {t(getInfoText(currency))}</DialogInfo>
        )}
      </DialogBottom>
    </HookForm>
  );
};

export interface FollowParamsFormValues {
  [FOLLOW_PARAMS_FIELDS.fixedCurrency]: string;
  [FOLLOW_PARAMS_FIELDS.mode]: SubscriptionMode;
  [FOLLOW_PARAMS_FIELDS.openTolerancePercent]: number;
  [FOLLOW_PARAMS_FIELDS.percent]: number;
  [FOLLOW_PARAMS_FIELDS.fixedVolume]: number;
}

export interface IFollowParamsProps {
  errorMessage?: string;
  subscribeFixedCurrencies: string[];
  rate: number;
  currency?: CurrencyEnum;
  paramsSubscription?: SignalSubscription;
  onSubmit: (values: FollowParamsFormValues) => void;
  onPrevStep?: () => void;
}

const FollowParams = React.memo(_FollowParams);
export default FollowParams;
