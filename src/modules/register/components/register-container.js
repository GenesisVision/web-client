import { connect } from "react-redux";
import React from "react";

import registerActions from "../actions/register-actions";
import RegisterForm from "./register-form/register-form";

const RegisterContainer = ({
  isAuthenticated,
  isPending,
  errorMessage,
  register,
  alreadyAuthenticated
}) => {
  const handleSubmit = (registerFormData, setSubmitting) => {
    register(registerFormData, setSubmitting);
  };

  return <RegisterForm onSubmit={handleSubmit} error={errorMessage} />;
};

const mapStateToProps = state => {
  const { isPending, errorMessage } = state.registerData;
  const { isAuthenticated } = state.authData;
  return { isAuthenticated, isPending, errorMessage };
};

const mapDispatchToProps = dispatch => ({
  register: (registerFormData, setSubmitting) => {
    dispatch(registerActions.registerUser(registerFormData)).catch(() => {
      setSubmitting(false);
    });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);
