import { Link } from "react-router-dom";
import { withFormik, Field } from "formik";
import React from "react";

import InputText from "../../../../components/form/input-text/input-text";
import routes from "../../../../../utils/constants/routes";

import validationSchema from "./register-form.validators";

const RegisterForm = ({
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
    <div className="container login">
      <form onSubmit={handleSubmit} className="form-horizontal" noValidate>
        <div className="row">
          <div className="col-md-3" />
          <div className="col-md-6">
            <h2>Sign Up</h2>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-md-3" />
          <div className="col-md-6">
            <Field
              type="email"
              name="email"
              placeholder="Email"
              addon="fas fa-envelope"
              component={InputText}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-3" />
          <div className="col-md-6">
            <Field
              type="password"
              name="password"
              placeholder="Password"
              addon="fas fa-lock"
              component={InputText}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-3" />
          <div className="col-md-6">
            <Field
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              addon="fas fa-lock"
              component={InputText}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-3" />
          <div className="col-md-6">
            <span className="text-danger">
              {error && <strong>{error}</strong>}
            </span>
          </div>
        </div>
        <div className="row form-group">
          <div className="offset-md-3 col-md-6">
            <button type="submit" className="btn btn-success">
              <span className="oi oi-account-login" /> Sing Up
            </button>
            &nbsp;
            <Link to={routes.login}>or login</Link>
          </div>
        </div>
      </form>
    </div>
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
