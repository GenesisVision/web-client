import { withFormik } from "formik";
import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import React from "react";
import FormError from "shared/components/form/form-error/form-error";

import validationSchema from "./two-factor-code-form.validators";

const TwoFactorCodeForm = ({ handleSubmit, isSubmitting, error }) => {
  return (
    <form id="twoFactorForm" onSubmit={handleSubmit} noValidate>
      <GVFormikField
        type="text"
        name="twoFactorCode"
        placeholder="Authentiacation code"
        component={GVTextField}
      />
      <FormError error={error} />
      <GVButton id="twoFactorSubmit" disabled={isSubmitting}>
        Verify
      </GVButton>
    </form>
  );
};

export default withFormik({
  displayName: "twoFactorForm",
  mapPropsToValues: () => ({
    twoFactorCode: ""
  }),
  validationSchema: validationSchema,
  handleSubmit: (values, { props, setSubmitting }) => {
    props.onSubmit(values.twoFactorCode, setSubmitting);
  }
})(TwoFactorCodeForm);
