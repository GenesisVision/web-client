import { Link } from "react-router-dom";
import { withFormik, Field } from "formik";
import React from "react";

import FormError from "../../../../shared/components/form/form-error/form-error";
import InputText from "../../../../shared/components/form/input-text/input-text";

import "./login-form.css";
import { FORGOT_PASSWORD_ROUTE } from "../../../password-reset/password-reset.constants";
import { REGISTER_ROUTE } from "../../../register/register.constants";
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
        <Link className="login__forgot-passowrd" to={FORGOT_PASSWORD_ROUTE}>
          Forgot password
        </Link>
        <FormError error={error} />

        <button
          type="submit"
          id="loginSubmit"
          className="gv-btn gv-btn-primary"
          disabled={isSubmitting}
        >
          Sign in
        </button>
        <div className="login__separator" />
        <a
          href={process.env.REACT_APP_MANAGER_PORTAL_URL}
          className="login__btn gv-btn gv-btn-secondary"
        >
          Login as Manager
        </a>
        <Link
          to={REGISTER_ROUTE}
          className="login__btn gv-btn gv-btn-secondary"
        >
          Don’t have an account? Sign Up!
        </Link>
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
