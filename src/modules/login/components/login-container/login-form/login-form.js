import "./login-form.css";

import { Field, withFormik } from "formik";
import React from "react";
import FormError from "shared/components/form/form-error/form-error";
import InputText from "shared/components/form/input-text/input-text";

import validationSchema from "./login-form.validators";

const LoginForm = ({
  values,
  touched,
  errors,
  isSubmitting,
  handleChange,
  handleBlur,
  handleSubmit,
  handleReset,
  dirty,
  error
}) => {
  return (
    <form id="loginForm" onSubmit={handleSubmit} noValidate>
      <div className="login">
        <div className="login__header">Login</div>
        <Field
          type="email"
          name="email"
          placeholder="Email"
          addon="fas fa-envelope"
          component={InputText}
        />
        <Field
          type="password"
          name="password"
          placeholder="Password"
          addon="fas fa-lock"
          component={InputText}
        />
        <FormError error={error} />
      </div>
    </form>
  );
};

export default withFormik({
  displayName: "login",
  mapPropsToValues: () => ({
    email: "",
    password: ""
  }),
  validationSchema: validationSchema,
  handleSubmit: (values, { props, setSubmitting }) => {
    props.onSubmit(values, setSubmitting);
  }
})(LoginForm);
