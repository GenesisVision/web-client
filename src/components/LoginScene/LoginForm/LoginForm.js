import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import React from 'react'
import * as classnames from 'classnames'

import { renderField } from '../../common/renderFields'
import routes from '../../../utils/constants/routes'

import validate from './LoginForm.validation'

const LoginForm = ({ error, handleSubmit, pristine, reset, submitting, login }) => {
  return (
    <div className="container login">
      <form onSubmit={handleSubmit} className="form-horizontal" noValidate>
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <h2>Please Login</h2>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <Field name="username" component={renderField} type="text" placeholder="Username" addon="oi-person" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <Field name="password" component={renderField} type="password" placeholder="Password" addon="oi-lock-locked" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <span className="text-danger">{error && <strong>{error}</strong>}</span>
          </div>
        </div>
        <div className="row form-group">
          <div className="offset-md-3 col-md-6">
            <button type="submit" className="btn btn-success" disabled={submitting}>
              <span className={classnames({"oi": true, "oi-account-login": !submitting, "oi-aperture": submitting})}></span>&nbsp;Login</button>
            &nbsp;
            <Link to={routes.signup}>or register</Link>
          </div>
        </div>
      </form>
    </div>
  )
}

export default reduxForm({
  form: 'login',
  validate
})(LoginForm)
