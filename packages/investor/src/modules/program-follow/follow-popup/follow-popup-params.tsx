import { InjectedFormikProps, withFormik } from "formik";
import { AttachToSignalProviderModeEnum, SignalSubscription } from "gv-api-web";
import React, { useCallback } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { compose } from "redux";
import GVButton from "shared/components/gv-button";
import GVFormikField from "shared/components/gv-formik-field";
import GVTextField from "shared/components/gv-text-field";
import InputAmountField from "shared/components/input-amount-field/input-amount-field";
import Select from "shared/components/select/select";
import { SetSubmittingType } from "shared/utils/types";
import { number, object } from "yup";

const _FollowParams: React.FC<
  InjectedFormikProps<Props, FollowParamsFormValues>
> = ({
  t,
  setFieldValue,
  isSubmitting,
  onPrevStep,
  isShowBack,
  isValid,
  values,
  handleSubmit
}) => {
  const { mode } = values;
  const setMaxOpenTolerancePercent = useCallback(() => {
    setFieldValue(FIELDS.openTolerancePercent, "20");
  }, []);
  const setMaxVolumePercent = useCallback(() => {
    setFieldValue(FIELDS.percent, "999");
  }, []);
  const disableButton = isSubmitting || !isValid;
  return (
    <form className="dialog__bottom" id="follow-params" onSubmit={handleSubmit}>
      <div className="dialog-field">
        <GVFormikField
          name={FIELDS.mode}
          component={GVTextField}
          label={t("follow-program.params.type")}
          InputComponent={Select}
        >
          {Object.keys(modes).map((mode: string) => (
            <option value={modes[mode].value} key={modes[mode].value}>
              {modes[mode].label}
            </option>
          ))}
        </GVFormikField>
      </div>
      {mode === modes.percentage.value && (
        <div className="dialog-field">
          <InputAmountField
            name={FIELDS.percent}
            label={t("follow-program.params.volume-percent")}
            currency={"%"}
            setMax={setMaxVolumePercent}
          />
        </div>
      )}
      {mode === modes.fixed.value && (
        <div className="dialog-field">
          <InputAmountField
            name={FIELDS.fixedVolume}
            label={t("follow-program.params.usd-equivalent")}
            currency={"USD"}
          />
        </div>
      )}
      <div className="dialog-field">
        <InputAmountField
          name={FIELDS.openTolerancePercent}
          label={t("follow-program.params.tolerance-percent")}
          currency={"%"}
          setMax={setMaxOpenTolerancePercent}
        />
      </div>
      <div className="dialog__buttons">
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
      </div>
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
  value: AttachToSignalProviderModeEnum;
};

const modes: { [key: string]: mode } = {
  byBalance: { label: "By balance", value: "ByBalance" },
  percentage: { label: "Percentage", value: "Percent" },
  fixed: { label: "Fixed", value: "Fixed" }
};

export interface FollowParamsFormValues {
  [FIELDS.mode]: AttachToSignalProviderModeEnum;
  [FIELDS.openTolerancePercent]: number;
  [FIELDS.percent]: number;
  [FIELDS.fixedVolume]: number;
}

interface OwnProps {
  isShowBack: boolean;
  paramsSubscription?: SignalSubscription;
  onSubmit: (
    values: FollowParamsFormValues,
    setSubmitting: SetSubmittingType
  ) => void;
  onPrevStep(): void;
}

interface Props extends OwnProps, InjectedTranslateProps {}

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
          : (modes.byBalance.value as AttachToSignalProviderModeEnum),
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
          .max(99999, t("follow-program.params.validation.fixedVolume-max")),
        [FIELDS.percent]: number()
          .min(1, t("follow-program.params.validation.percent-min"))
          .max(999, t("follow-program.params.validation.percent-max")),
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
