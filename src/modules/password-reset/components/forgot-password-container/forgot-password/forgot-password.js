import { withFormik, Field } from "formik";
import React from "react";

import FormError from "../../../../../shared/components/form/form-error/form-error";
import InputText from "../../../../../shared/components/form/input-text/input-text";

import "./forgot-password.css";
import validationSchema from "./forgot-password.validators";

const ForgotPasswordForm = ({ values, isSubmitting, handleSubmit, error }) => {
  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="forgot-password">
        <div className="forgot-password__header">Forgot Password</div>
        <Field
          type="email"
          name="email"
          placeholder="Email"
          addon="fas fa-envelope"
          component={InputText}
        />
        <FormError error={error} />
        <button
          type="submit"
          className="gv-btn gv-btn-primary"
          disabled={isSubmitting}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default withFormik({
  displayName: "forgotPassword",
  mapPropsToValues: () => ({
    email: ""
  }),
  validationSchema: validationSchema,
  handleSubmit: (values, { props, setSubmitting }) => {
    props.onSubmit(values, setSubmitting);
  }
})(ForgotPasswordForm);
