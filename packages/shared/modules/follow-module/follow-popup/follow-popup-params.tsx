import { InjectedFormikProps, withFormik } from "formik";
import { SignalSubscription, SubscriptionMode } from "gv-api-web";
import React, { useCallback } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { compose } from "redux";
import { DialogBottom } from "shared/components/dialog/dialog-bottom";
import { DialogButtons } from "shared/components/dialog/dialog-buttons";
import { DialogField } from "shared/components/dialog/dialog-field";
import GVButton from "shared/components/gv-button";
import GVFormikField from "shared/components/gv-formik-field";
import GVTextField from "shared/components/gv-text-field";
import InputAmountField from "shared/components/input-amount-field/input-amount-field";
import Select from "shared/components/select/select";
import { TooltipLabel } from "shared/components/tooltip-label/tooltip-label";
import Tooltip from "shared/components/tooltip/tooltip";
import { convertFromCurrency } from "shared/utils/currency-converter";
import { formatCurrencyValue } from "shared/utils/formatter";
import { CurrencyEnum, SetSubmittingType } from "shared/utils/types";
import { number, object } from "yup";

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
  rate,
  currency,
  t,
  setFieldValue,
  isSubmitting,
  onPrevStep,
  isShowBack,
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
          <DialogField>
            <InputAmountField
              name={FIELDS.fixedVolume}
              label={`${t("follow-program.params.usd-equivalent")} *`}
              currency={"USD"}
            />
            <NumberFormat
              value={formatCurrencyValue(
                convertFromCurrency(values[FIELDS.fixedVolume]!, rate),
                currency
              )}
              prefix="≈ "
              suffix={` ${currency}`}
              displayType="text"
            />
          </DialogField>
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
          {isShowBack && (
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
        {values[FIELDS.mode] === modes.fixed.value && (
          <div className="dialog__info">* {t(getInfoText(currency))}</div>
        )}
      </DialogBottom>
    </form>
  );
};

enum FIELDS {
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
  [FIELDS.mode]: SubscriptionMode;
  [FIELDS.openTolerancePercent]: number;
  [FIELDS.percent]: number;
  [FIELDS.fixedVolume]: number;
}

interface OwnProps {
  rate: number;
  currency: CurrencyEnum;
  isShowBack: boolean;
  paramsSubscription?: SignalSubscription;
  onSubmit: (
    values: FollowParamsFormValues,
    setSubmitting: SetSubmittingType
  ) => void;
  onPrevStep(): void;
}

interface Props extends OwnProps, WithTranslation {}

const FollowParams = compose<React.ComponentType<OwnProps>>(
  translate(),
  withFormik<Props, FollowParamsFormValues>({
    isInitialValid: true,
    displayName: "follow-params",
    mapPropsToValues: props => {
      const params = props.paramsSubscription;
      return {
        [FIELDS.mode]: params
          ? params.mode
          : (modes.byBalance.value as SubscriptionMode),
        [FIELDS.openTolerancePercent]: params
          ? params.openTolerancePercent
          : 0.5,
        [FIELDS.fixedVolume]: params ? params.fixedVolume : 100,
        [FIELDS.percent]: params ? params.percent : 10
      };
    },
    validationSchema: ({ t }: Props) =>
      object().shape({
        [FIELDS.fixedVolume]: number()
          .min(0, t("follow-program.params.validation.fixedVolume-min"))
          .lessThan(
            100000,
            t("follow-program.params.validation.fixedVolume-max")
          ),
        [FIELDS.percent]: number()
          .min(1, t("follow-program.params.validation.percent-min"))
          .lessThan(1000, t("follow-program.params.validation.percent-max"))
          .nullable(true),
        [FIELDS.openTolerancePercent]: number()
          .required(t("follow-program.params.validation.tolerance-required"))
          .min(
            0.01,
            t("follow-program.params.validation.tolerance-percent-min")
          )
          .max(20, t("follow-program.params.validation.tolerance-percent-max"))
      }),
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  }),
  React.memo
)(_FollowParams);
export default FollowParams;
