import { FormikProps, withFormik } from "formik";
import SignalsFeeFormPartial from "pages/create-program/components/create-program-settings/signals-fee-form.partial";
import React, { ComponentType, FunctionComponent } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { compose } from "redux";
import GVButton from "shared/components/gv-button";
import { SetSubmittingType } from "shared/utils/types";

import { SignalValidationSchema } from "./program-signal.validators";

const _ProgramSignalForm: FunctionComponent<Props> = ({
  t,
  dirty,
  handleSubmit,
  programName,
  signalSuccessFee,
  signalVolumeFee,
  header,
  errorMessage,
  isSubmitting
}) => {
  return (
    <form id="makeSignalForm" onSubmit={handleSubmit}>
      <div className="dialog__top">
        <div className="dialog__header">
          <h2>{header}</h2>
          <p>{programName}</p>
        </div>
      </div>
      <div className="dialog__bottom">
        <SignalsFeeFormPartial
          volumeFeeFieldName={FORM_FIELDS.volumeFee}
          successFeeFieldName={FORM_FIELDS.successFee}
          hasSubscriptionFeeAutofocus={true}
        />
        <div className="form-error">{errorMessage}</div>
        <div className="dialog__buttons">
          <GVButton
            type="submit"
            id="programMakeSignalSubmit"
            disabled={!dirty || isSubmitting}
          >
            {t("buttons.confirm")}
          </GVButton>
        </div>
      </div>
    </form>
  );
};

const ProgramSignalForm = compose<ComponentType<OwnProps>>(
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
    InjectedTranslateProps,
    FormikProps<IProgramSignalFormValues> {}
