import SignalsFeeFormPartial from "components/assets/fields/signals-fee-form.partial";
import GVButton from "components/gv-button";
import GVSwitch from "components/gv-selection/gv-switch";
import SettingsBlock from "components/settings-block/settings-block";
import withLoader, { WithLoaderProps } from "decorators/with-loader";
import { FormikProps, withFormik } from "formik";
import { SignalValidationSchema } from "modules/program-signal/program-signal-popup/components/program-signal.validators";
import React, { useCallback, useState } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import { SetSubmittingType } from "utils/types";

const _SignalingEdit: React.FC<Props> = ({
  isValid,
  handleSubmit,
  dirty,
  isSubmitting,
  t,
  isSignalProgram
}) => {
  const [isSignal, setIsSignal] = useState<boolean>(isSignalProgram);
  const changeIsSignal = useCallback(() => setIsSignal(!isSignal), [isSignal]);
  return (
    <SettingsBlock label={t("program-settings.signaling-program.title")}>
      <form id="signaling-edit-form" onSubmit={handleSubmit}>
        <div className="program-settings__signaling-edit-form-title-block">
          {!isSignalProgram && (
            <GVSwitch
              touched={false}
              className="notification-setting__switch"
              name={"isSignal"}
              value={isSignal}
              color="primary"
              onChange={changeIsSignal}
            />
          )}
        </div>
        {isSignal && (
          <SignalsFeeFormPartial
            volumeFeeFieldName={FORM_FIELDS.volumeFee}
            successFeeFieldName={FORM_FIELDS.successFee}
          />
        )}
        <GVButton
          type="submit"
          id="programMakeSignalSubmit"
          disabled={!dirty || isSubmitting || !isSignal || !isValid}
        >
          {"Save"}
        </GVButton>
      </form>
    </SettingsBlock>
  );
};

interface Props
  extends OwnProps,
    WithTranslation,
    FormikProps<IProgramSignalFormValues> {}

enum FORM_FIELDS {
  successFee = "successFee",
  volumeFee = "volumeFee"
}

export interface IProgramSignalFormValues {
  [FORM_FIELDS.successFee]?: number;
  [FORM_FIELDS.volumeFee]?: number;
}

interface OwnProps {
  isSignalProgram: boolean;
  signalSuccessFee?: number;
  signalVolumeFee?: number;
  onSubmit(
    values: IProgramSignalFormValues,
    setSubmitting: SetSubmittingType
  ): void;
}

const SignalingEdit = compose<React.ComponentType<OwnProps & WithLoaderProps>>(
  withLoader,
  translate(),
  withFormik<OwnProps, IProgramSignalFormValues>({
    enableReinitialize: true,
    displayName: "make-signal-form",
    mapPropsToValues: props => ({
      [FORM_FIELDS.successFee]: props.signalSuccessFee,
      [FORM_FIELDS.volumeFee]: props.signalVolumeFee
    }),
    validationSchema: SignalValidationSchema,
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  }),
  React.memo
)(_SignalingEdit);
export default SignalingEdit;
