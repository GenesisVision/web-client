import { FormikProps, withFormik } from "formik";
import SignalsFeeFormPartial from "pages/create-program/components/create-program-settings/signals-fee-form.partial";
import React, { ComponentType, FunctionComponent } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { compose } from "redux";
import GVButton from "shared/components/gv-button";
import { SetSubmittingType } from "shared/utils/types";

import { makeSignalValidationSchema } from "./program-make-signal.validators";

interface IMakeSignalFormOwnProps {
  programName: string;
  errorMessage: string;
  onSubmit(
    values: IMakeSignalFormValues,
    setSubmitting: SetSubmittingType
  ): void;
}

enum FORM_FIELDS {
  successFee = "successFee",
  volumeFee = "volumeFee"
}

export interface IMakeSignalFormValues {
  [FORM_FIELDS.successFee]?: number;
  [FORM_FIELDS.volumeFee]?: number;
}

type MakeSignalFormProps = InjectedTranslateProps &
  IMakeSignalFormOwnProps &
  FormikProps<IMakeSignalFormValues>;
const MakeSignalForm: FunctionComponent<MakeSignalFormProps> = ({
  t,
  dirty,
  handleSubmit,
  programName,
  errorMessage,
  isSubmitting
}) => {
  return (
    <form id="makeSignalForm" onSubmit={handleSubmit}>
      <div className="dialog__top">
        <div className="dialog__header">
          <h2>{t("program-details-page.description.signal-provider.title")}</h2>
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

export default compose<ComponentType<IMakeSignalFormOwnProps>>(
  translate(),
  withFormik<IMakeSignalFormOwnProps, IMakeSignalFormValues>({
    displayName: "make-signal-form",
    mapPropsToValues: () => ({
      [FORM_FIELDS.successFee]: undefined,
      [FORM_FIELDS.volumeFee]: undefined
    }),
    validationSchema: makeSignalValidationSchema,
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  })
)(MakeSignalForm);
