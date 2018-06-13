import { withFormik, Field } from "formik";
import Button from "components/button/button";
import FormError from "shared/components/form/form-error/form-error";
import InputText from "shared/components/form/input-text/input-text";
import React from "react";

import "../../login-container/login-form/login-form.css";
import { LOGIN_ROUTE_TWO_FACTOR_RECOVERY_ROUTE } from "../../../login.constants";
import validationSchema from "./two-factor-form.validators";

const TwoFactorForm = ({ handleSubmit, isSubmitting, error }) => {
  return (
    <form id="twoFactorForm" onSubmit={handleSubmit} noValidate>
      <div className="login">
        <div className="login__header">Two-factor authentication</div>
        <Field
          type="text"
          name="twoFactor"
          placeholder="Authentiacation code"
          addon="fas fa-key"
          component={InputText}
        />
        <FormError error={error} />
        <Button
          label="Verify"
          id="twoFactorSubmit"
          primary
          disabled={isSubmitting}
        />
        <div className="login__separator" />
        <div>
          Open the two-factor authentication app on your device to view your
          authentication code and verify your identity.
        </div>
        <div className="login__separator" />
        <h5>Don’t have your phone?</h5>
        <Button
          className="login__recovery-link"
          href={LOGIN_ROUTE_TWO_FACTOR_RECOVERY_ROUTE}
          label="Enter a two-factor recovery code"
        />
      </div>
    </form>
  );
};

export default withFormik({
  displayName: "twoFactorForm",
  mapPropsToValues: () => ({
    twoFactor: ""
  }),
  validationSchema: validationSchema,
  handleSubmit: (values, { props, setSubmitting }) => {
    props.onSubmit(values.twoFactor, setSubmitting);
  }
})(TwoFactorForm);
