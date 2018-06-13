import { withFormik, Field } from "formik";
import Button from "components/button/button";
import FormError from "shared/components/form/form-error/form-error";
import InputText from "shared/components/form/input-text/input-text";
import React from "react";

import "../../login-container/login-form/login-form.css";
import validationSchema from "./recovery-form.validators";

const RecoveryForm = ({ handleSubmit, isSubmitting, error }) => {
  return (
    <form id="recoveryForm" onSubmit={handleSubmit} noValidate>
      <div className="login">
        <div className="login__header">Recovery code</div>
        <Field
          type="text"
          name="recovery"
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
    recovery: ""
  }),
  validationSchema: validationSchema,
  handleSubmit: (values, { props, setSubmitting }) => {
    props.onSubmit(values.recovery, setSubmitting);
  }
})(RecoveryForm);
