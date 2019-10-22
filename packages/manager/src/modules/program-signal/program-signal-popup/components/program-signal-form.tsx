import { FormikProps, withFormik } from "formik";
import SignalsFeeFormPartial from "pages/create-program/components/create-program-settings/signals-fee-form.partial";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import { DialogBottom } from "shared/components/dialog/dialog-bottom";
import { DialogButtons } from "shared/components/dialog/dialog-buttons";
import { DialogTop } from "shared/components/dialog/dialog-top";
import FormError from "shared/components/form/form-error/form-error";
import GVButton from "shared/components/gv-button";
import { SetSubmittingType } from "shared/utils/types";

import { SignalValidationSchema } from "./program-signal.validators";

const _ProgramSignalForm: React.FC<Props> = ({
  t,
  dirty,
  handleSubmit,
  programName,
  header,
  errorMessage,
  isSubmitting
}) => {
  return (
    <form id="makeSignalForm" onSubmit={handleSubmit}>
      <DialogTop title={header} subtitle={programName} />
      <DialogBottom>
        <SignalsFeeFormPartial
          volumeFeeFieldName={FORM_FIELDS.volumeFee}
          successFeeFieldName={FORM_FIELDS.successFee}
          hasSubscriptionFeeAutofocus={true}
        />
        <FormError error={errorMessage} />
        <DialogButtons>
          <GVButton
            type="submit"
            id="programMakeSignalSubmit"
            disabled={!dirty || isSubmitting}
          >
            {t("buttons.confirm")}
          </GVButton>
        </DialogButtons>
      </DialogBottom>
    </form>
  );
};

const ProgramSignalForm = compose<React.ComponentType<OwnProps>>(
  translate(),
  withFormik<OwnProps, IProgramSignalFormValues>({
    displayName: "make-signal-form",
    mapPropsToValues: props => ({
      [FORM_FIELDS.successFee]: props.signalSuccessFee,
      [FORM_FIELDS.volumeFee]: props.signalVolumeFee
    }),
    validationSchema: SignalValidationSchema,
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  })
)(_ProgramSignalForm);

export default ProgramSignalForm;

interface OwnProps {
  programName: string;
  header: string;
  signalSuccessFee?: number;
  signalVolumeFee?: number;
  errorMessage: string;
  onSubmit(
    values: IProgramSignalFormValues,
    setSubmitting: SetSubmittingType
  ): void;
}

enum FORM_FIELDS {
  successFee = "successFee",
  volumeFee = "volumeFee"
}

export interface IProgramSignalFormValues {
  [FORM_FIELDS.successFee]?: number;
  [FORM_FIELDS.volumeFee]?: number;
}

interface Props
  extends OwnProps,
    WithTranslation,
    FormikProps<IProgramSignalFormValues> {}
