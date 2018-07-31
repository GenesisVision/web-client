import Button from "components/button/button";
import { Field, withFormik } from "formik";
import React from "react";
import FormError from "shared/components/form/form-error/form-error";
import InputText from "shared/components/form/input-text/input-text";

import validationSchema from "./recovery-code-form.validators";

const RecoveryCodeForm = ({ handleSubmit, isSubmitting, error }) => {
  return (
    <form id="recoveryForm" onSubmit={handleSubmit} noValidate>
      <div className="login">
        <div className="login__header">Recovery code</div>
        <Field
          type="text"
          name="recoveryCode"
          placeholder="Recovery code"
          addon="fas fa-key"
          component={InputText}
        />
        <FormError error={error} />
        <Button
          label="Verify"
          id="recoverySubmit"
          primary
          disabled={isSubmitting}
        />
        <div className="login__separator" />
        <div>
          You can enter one of your recovery codes in case you lost access to
          your mobile device.
        </div>
      </div>
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
