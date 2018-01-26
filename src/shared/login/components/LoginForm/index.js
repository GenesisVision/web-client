import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import * as classnames from "classnames";
import React from "react";

import FieldInput from "../../../components/FieldInput/FieldInput";
import routes from "../../../../utils/constants/routes";

import validate from "./validators";

const LoginForm = ({
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
            <h2>Please Login</h2>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-md-3" />
          <div className="col-md-6">
            <Field
              name="email"
              component={FieldInput}
              type="text"
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
            <span className="text-danger">
              {error && <strong>{error}</strong>}
            </span>
          </div>
        </div>
        <div className="row form-group">
          <div className="offset-md-3 col-md-6">
            <button
              type="submit"
              className="btn btn-success"
              disabled={submitting}
            >
              <span
                className={classnames({
                  oi: true,
                  "oi-account-login": !submitting,
                  "oi-aperture": submitting
                })}
              />&nbsp;Login
            </button>
            &nbsp;
            <Link to={routes.signup}>or register</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default reduxForm({
  form: "login",
  validate
})(LoginForm);
