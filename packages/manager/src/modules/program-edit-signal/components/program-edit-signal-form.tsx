import { FormikProps, withFormik } from "formik";
import { ProgramDetailsFull } from "gv-api-web";
import { makeSignalValidationSchema } from "modules/program-make-signal/components/program-make-signal.validators";
import SignalsFeeFormPartial from "pages/create-program/components/create-program-settings/signals-fee-form.partial";
import React, { ComponentType, FunctionComponent } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { compose } from "redux";
import GVButton from "shared/components/gv-button";
import { SetSubmittingType } from "shared/utils/types";

enum FORM_FIELDS {
  successFee = "successFee",
  volumeFee = "volumeFee"
}

const _ProgramEditSignalForm: FunctionComponent<Props> = ({
  t,
  dirty,
  isValid,
  handleSubmit,
  programDescription,
  errorMessage,
  isSubmitting
}) => {
  return (
    <form id="editSignalForm" onSubmit={handleSubmit}>
      <div className="dialog__top">
        <div className="dialog__header">
          <h2>
            {t("program-details-page.description.edit-signal-provider.title")}
          </h2>
          <p>{programDescription.title}</p>
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
            id="editSignalForm"
            disabled={!dirty || !isValid || isSubmitting}
          >
            {t("buttons.confirm")}
          </GVButton>
        </div>
      </div>
    </form>
  );
};

const ProgramEditSignalForm = compose<ComponentType<OwnProps>>(
  translate(),
  withFormik<OwnProps, IProgramEditSignalFormValues>({
    displayName: "edit-signal-form",
    mapPropsToValues: props => ({
      [FORM_FIELDS.successFee]: props.programDescription.signalSuccessFee,
      [FORM_FIELDS.volumeFee]: props.programDescription.signalVolumeFee
    }),
    validationSchema: makeSignalValidationSchema,
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  })
)(_ProgramEditSignalForm);

export default ProgramEditSignalForm;

export interface IProgramEditSignalFormValues {
  [FORM_FIELDS.successFee]: number;
  [FORM_FIELDS.volumeFee]: number;
}

interface OwnProps {
  programDescription: ProgramDetailsFull;
  errorMessage: string;
  onSubmit(
    values: IProgramEditSignalFormValues,
    setSubmitting: SetSubmittingType
  ): void;
}

interface Props
  extends InjectedTranslateProps,
    OwnProps,
    FormikProps<IProgramEditSignalFormValues> {}
