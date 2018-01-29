import { Link } from "react-router-dom";
import { withFormik } from "formik";
import React from "react";

import FieldInput from "../../../../components/FieldInput/FieldInput";
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
            <FieldInput
              type="text"
              id="email"
              name="email"
              placeholder="Email"
              touched={touched.email}
              error={errors.email}
              addon="fa fa-envelope"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-3" />
          <div className="col-md-6">
            <FieldInput
              type="password"
              id="passport"
              name="password"
              placeholder="Password"
              touched={touched.password}
              error={errors.password}
              addon="fa fa-lock"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-3" />
          <div className="col-md-6">
            <FieldInput
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              touched={touched.confirmPassword}
              error={errors.confirmPassword}
              addon="fa fa-lock"
              onChange={handleChange}
              onBlur={handleBlur}
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
