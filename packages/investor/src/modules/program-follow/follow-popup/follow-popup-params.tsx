import { InjectedFormikProps, withFormik } from "formik";
import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { compose } from "redux";
import InputAmountField from "shared/components/input-amount-field/input-amount-field";
import Select from "shared/components/select/select";
import { SetSubmittingType } from "shared/utils/types";
import { number, object } from "yup";

import { IRequestParams } from "./follow-popup-form";

class FollowParams extends React.PureComponent<
  InjectedFormikProps<Props, FormValues>
> {
  render() {
    const {
      t,
      setFieldValue,
      isSubmitting,
      onPrevStep,
      isValid,
      values,
      handleSubmit
    } = this.props;
    const { openTolerancePercent, mode } = values;
    const setMaxOpenTolerancePercent = () => {
      setFieldValue("openTolerancePercent", "20");
    };
    const setMaxVolumePercent = () => {
      setFieldValue("percent", "999");
    };
    const setMaxAmountFixedVolume = () => {
      setFieldValue("fixedVolume", "99999");
    };
    const isAllow = (values: any) => {
      // return true;
    };
    const disableButton = isSubmitting || !isValid;
    return (
      <form
        className="dialog__bottom"
        id="follow-params"
        onSubmit={handleSubmit}
      >
        <div className="dialog-field">
          <GVFormikField
            name="mode"
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
        <div className="dialog-field">
          <InputAmountField
            name="openTolerancePercent"
            label={t("follow-program.params.tolerance-percent")}
            currency={"%"}
            setMax={setMaxOpenTolerancePercent}
          />
        </div>
        {mode === modes.percentage.value && (
          <div className="dialog-field">
            <InputAmountField
              name="percent"
              label={t("follow-program.params.volume-percent")}
              currency={"%"}
              setMax={setMaxVolumePercent}
            />
          </div>
        )}
        {mode === modes.fixed.value && (
          <div className="dialog-field">
            <InputAmountField
              name="fixedVolume"
              label={t("follow-program.params.usd-equivalent")}
              currency={"USD"}
              setMax={setMaxAmountFixedVolume}
            />
          </div>
        )}
        <div className="dialog__buttons">
          <GVButton onClick={onPrevStep} color="secondary" variant="outlined">
            {t("follow-program.params.back")}
          </GVButton>
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
  }
}

type mode = {
  label: string;
  value: string;
};

const modes: { [key: string]: mode } = {
  byBalance: { label: "By balance", value: "ByBalance" },
  percentage: { label: "Percentage", value: "Percentage" },
  fixed: { label: "Fixed", value: "Fixed" }
};

interface FormValues {
  mode: string;
  openTolerancePercent: number;
  percent: number;
  fixedVolume: number;
}

interface OwnProps {
  onSubmit: (values: IRequestParams, setSubmitting: SetSubmittingType) => void;
  onPrevStep(): void;
}

interface Props extends OwnProps, InjectedTranslateProps {}

export default compose<React.ComponentType<OwnProps>>(
  translate(),
  withFormik<Props, FormValues>({
    isInitialValid: true,
    displayName: "follow-params",
    mapPropsToValues: () => {
      return {
        mode: modes.byBalance.value,
        openTolerancePercent: 0.5,
        fixedVolume: 100,
        percent: 10
      };
    },
    validationSchema: ({ t }: Props) =>
      object().shape({
        fixedVolume: number()
          .min(0, t("follow-program.params.validation.fixedVolume-min"))
          .max(99999, t("follow-program.params.validation.fixedVolume-max")),
        percent: number()
          .min(1, t("follow-program.params.validation.percent-min"))
          .max(999, t("follow-program.params.validation.percent-max")),
        openTolerancePercent: number()
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
  })
)(FollowParams);
