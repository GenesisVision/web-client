import { withFormik } from "formik";
import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import React from "react";
import FormError from "shared/components/form/form-error/form-error";

import validationSchema from "./recovery-code-form.validators";

const RecoveryCodeForm = ({ handleSubmit, isSubmitting, error }) => {
  return (
    <form id="recoveryForm" onSubmit={handleSubmit} noValidate>
      <GVFormikField
        name="recoveryCode"
        placeholder="Recovery code"
        component={GVTextField}
      />
      <FormError error={error} />
      <GVButton id="recoverySubmit" disabled={isSubmitting}>
        Verify
      </GVButton>
    </form>
  );
};

export default withFormik({
  displayName: "recoveryForm",
  mapPropsToValues: () => ({
    recoveryCode: ""
  }),
  validationSchema: validationSchema,
  handleSubmit: (values, { props, setSubmitting }) => {
    props.onSubmit(values.recoveryCode, setSubmitting);
  }
})(RecoveryCodeForm);
