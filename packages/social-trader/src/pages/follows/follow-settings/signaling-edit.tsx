import { FormikProps, withFormik } from "formik";
import { IProgramSignalFormValues } from "modules/program-signal/program-signal-popup/components/program-signal-form";
import { SignalValidationSchema } from "modules/program-signal/program-signal-popup/components/program-signal.validators";
import SignalsFeeFormPartial from "pages/create-program/components/create-program-settings/signals-fee-form.partial";
import React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import GVButton from "shared/components/gv-button";
import SettingsBlock from "shared/components/settings-block/settings-block";
import { SetSubmittingType } from "shared/utils/types";

const _SignalingEdit: React.FC<Props> = ({
  isValid,
  handleSubmit,
  dirty,
  isSubmitting,
  t
}) => {
  return (
    <SettingsBlock label={t("follow-settings.signaling-follow.title")}>
      <form id="signaling-edit-form" onSubmit={handleSubmit}>
        <SignalsFeeFormPartial
          volumeFeeFieldName={FORM_FIELDS.volumeFee}
          successFeeFieldName={FORM_FIELDS.successFee}
        />
        <GVButton
          type="submit"
          id="followMakeSignalSubmit"
          disabled={!dirty || isSubmitting || !isValid}
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
    FormikProps<IFollowSignalFormValues> {}

enum FORM_FIELDS {
  successFee = "successFee",
  volumeFee = "volumeFee"
}

export interface IFollowSignalFormValues {
  [FORM_FIELDS.successFee]?: number;
  [FORM_FIELDS.volumeFee]?: number;
}

interface OwnProps {
  signalSuccessFee?: number;
  signalVolumeFee?: number;
  onSubmit(
    values: IProgramSignalFormValues,
    setSubmitting: SetSubmittingType
  ): void;
}

const SignalingEdit = compose<React.ComponentType<OwnProps>>(
  translate(),
  withFormik<OwnProps, IFollowSignalFormValues>({
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
