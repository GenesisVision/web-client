import Form from "components/form/form";
import Input from "components/form/input/input";
import { withFormik } from "formik";
import { GVButton } from "gv-react-components";
import { FORGOT_PASSWORD_ROUTE } from "modules/password-reset/password-reset.constants";
import React from "react";

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
    <Form
      className={"login-form"}
      id="loginForm"
      onSubmit={handleSubmit}
      noValidate
    >
      <Input
        id={"loginEmail"}
        type="email"
        name="email"
        onChange={handleChange}
        placeholder="Email address"
        value={values.email}
        autoComplete="email"
      />
      <Input
        id={"loginPassword"}
        type="password"
        name="password"
        onChange={handleChange}
        placeholder="Password"
        value={values.password}
        autoComplete="current-password"
      />
      <GVButton
        id="loginSubmit"
        title="submit login form"
        color="primary"
        variant="contained"
        disabled={isSubmitting}
      >
        login
      </GVButton>
      <GVButton variant="text" color="secondary" href={FORGOT_PASSWORD_ROUTE}>
        Forgot?
      </GVButton>
    </Form>
  );
};

export default withFormik({
  displayName: "loginForm",
  mapPropsToValues: () => ({
    email: "",
    password: ""
  }),
  validationSchema: validationSchema,
  handleSubmit: (values, { props, setSubmitting }) => {
    props.onSubmit(values, setSubmitting);
  }
})(LoginForm);
