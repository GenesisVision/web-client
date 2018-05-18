import { Link } from "react-router-dom";
import { withFormik, Field } from "formik";
import React from "react";
import Button from "../../../../components/button/button";
import FormError from "../../../../shared/components/form/form-error/form-error";
import InputText from "../../../../shared/components/form/input-text/input-text";

import "./register-form.css";
import { LOGIN_ROUTE } from "../../../login/login.constants";
import validationSchema from "./register-form.validators";

const RegisterForm = ({ isSubmitting, handleSubmit, error }) => {
  return (
    <form id="registerForm" onSubmit={handleSubmit} noValidate>
      <div className="register">
        <div className="register__header">Sign Up</div>

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

        <Field
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          addon="fas fa-lock"
          component={InputText}
        />
        <FormError error={error} />
        <Button type="submit" id="registerFormSubmit" primary label="Sign Up" />
        <div className="register__separator" />
        <Button
          className="login__btn"
          href={LOGIN_ROUTE}
          label="Already have an account? Sign In!"
          secondary
        />
      </div>
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
