import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import React from "react";

import FieldInput from "../../../../components/FieldInput/FieldInput";
import routes from "../../../../../utils/constants/routes";

import validate from "./register-form.validators";

const RegisterForm = ({
  error,
  handleSubmit,
  pristine,
  reset,
  submitting,
  login
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
              name="email"
              component={FieldInput}
              type="email"
              placeholder="Email"
              addon="fa fa-envelope"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-3" />
          <div className="col-md-6">
            <Field
              name="password"
              component={FieldInput}
              type="password"
              placeholder="Password"
              addon="fa fa-lock"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-3" />
          <div className="col-md-6">
            <Field
              name="confirmPassword"
              component={FieldInput}
              type="password"
              placeholder="Confirm Password"
              addon="fa fa-lock"
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

export default reduxForm({
  form: "register",
  validate
})(RegisterForm);
