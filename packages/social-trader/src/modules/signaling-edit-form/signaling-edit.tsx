import SignalsFeeFormPartial from "components/assets/fields/signals-fee-form.partial";
import { DialogButtons } from "components/dialog/dialog-buttons";
import GVButton from "components/gv-button";
import { FormikProps, withFormik } from "formik";
import { FollowCreateAssetPlatformInfo } from "gv-api-web";
import React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import { SetSubmittingType } from "utils/types";

import { SignalValidationSchema } from "./program-signal.validators";

const _SignalingEdit: React.FC<Props> = ({
  inDialog,
  showFields,
  isValid,
  handleSubmit,
  dirty,
  isSubmitting,
  t,
  isSignalProgram
}) => {
  const renderButton = () => (
    <GVButton
      wide={inDialog}
      type="submit"
      disabled={!dirty || isSubmitting || !isValid}
    >
      {t("buttons.save")}
    </GVButton>
  );
  return (
    <form id="signaling-edit-form" onSubmit={handleSubmit}>
      {showFields && (
        <SignalsFeeFormPartial
          isSignalProgram={isSignalProgram}
          volumeFeeFieldName={FORM_FIELDS.volumeFee}
          successFeeFieldName={FORM_FIELDS.successFee}
        />
      )}

      {!isSignalProgram ? (
        inDialog ? (
          <DialogButtons>{renderButton()}</DialogButtons>
        ) : (
          renderButton()
        )
      ) : null}
    </form>
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
  followInfo: FollowCreateAssetPlatformInfo;
  isSignalProgram?: boolean;
  inDialog?: boolean;
  showFields: boolean;
  successFee?: number;
  volumeFee?: number;
  onSubmit: (
    values: IProgramSignalFormValues,
    setSubmitting: SetSubmittingType
  ) => void;
}

const SignalingEdit = compose<React.ComponentType<OwnProps>>(
  translate(),
  withFormik<OwnProps, IProgramSignalFormValues>({
    enableReinitialize: true,
    displayName: "make-signal-form",
    mapPropsToValues: ({ successFee, volumeFee }) => ({
      [FORM_FIELDS.successFee]: successFee,
      [FORM_FIELDS.volumeFee]: volumeFee
    }),
    validationSchema: SignalValidationSchema,
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  }),
  React.memo
)(_SignalingEdit);
export default SignalingEdit;
