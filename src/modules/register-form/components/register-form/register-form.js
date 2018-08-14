import "./register-form.css";

import { withFormik } from "formik";
import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import React from "react";

import FormError from "../../../../shared/components/form/form-error/form-error";
import validationSchema from "./register-form.validators";

const RegisterForm = ({ isSubmitting, handleSubmit, error }) => {
  return (
    <form id="registerForm" onSubmit={handleSubmit} noValidate>
      <GVFormikField
        type="email"
        name="email"
        label="Email address"
        component={GVTextField}
      />

      <GVFormikField
        type="new-password"
        name="Password"
        label="Password"
        component={GVTextField}
      />

      <GVFormikField
        type="new-password"
        name="confirmPassword"
        label="Confirm password"
        component={GVTextField}
      />

      <FormError error={error} />

      <GVButton type="submit" id="registerFormSubmit">
        Sign Up
      </GVButton>
    </form>
  );
};

export default withFormik({
  displayName: "register",
  mapPropsToValues: () => ({
    email: "",
    password: "",
    confirmPassword: ""
  }),
  validationSchema: validationSchema,
  handleSubmit: (values, { props, setSubmitting }) => {
    props.onSubmit(values, setSubmitting);
  }
})(RegisterForm);
