import { Link } from "react-router-dom";
import { withFormik, Field } from "formik";
import classnames from "classnames";
import React from "react";

import FormError from "../../../../shared/components/form/form-error/form-error";
import InputText from "../../../../shared/components/form/input-text/input-text";

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
            <FormError error={error} />
          </div>
        </div>
        <div className="row form-group">
          <div className="offset-md-3 col-md-6">
            <button
              type="submit"
              className="btn btn-success"
              disabled={isSubmitting}
            >
              <span
                className={classnames({
                  oi: true,
                  "oi-account-login": !isSubmitting,
                  "oi-aperture": isSubmitting
                })}
              />&nbsp;Login
            </button>
            &nbsp;
            <Link to={REGISTER_ROUTE}>or register</Link>
          </div>
        </div>
      </form>
    </div>
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
