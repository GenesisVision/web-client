import { connect } from "react-redux";
import React from "react";

import registerActions from "../../shared/modules/register/actions/register-actions";
import authActions from "../../actions/authActions";
import RegisterForm from "../../shared/modules/register/components/register-form/register-form";

const RegisterScene = ({
  isAuthenticated,
  isPending,
  errorMessage,
  register,
  alreadyAuthenticated
}) => {
  if (isAuthenticated) {
    alreadyAuthenticated();
    return null;
  }

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
    dispatch(registerActions.registerUser(registerFormData)).finally(() => {
      setSubmitting(false);
    });
  },
  alreadyAuthenticated: () => {
    dispatch(authActions.alreadyAuthenticated());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScene);
